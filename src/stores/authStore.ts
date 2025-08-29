import axios, { AxiosError, type AxiosInstance } from "axios";
import { create } from "zustand";

interface AuthState {
  userName: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  api: AxiosInstance; // добавляем сюда

  signUp: (newUser: { username: string; email: string; password: string }) => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<AuthResponse>;
  verifyRegistration2FA: (code: string) => Promise<void>;
  verifyLogin2FA: (code: string) => Promise<void>;
  logOut: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
}

interface AuthResponse {
  access?: string | null;
  refresh?: string | null;
  userName?: string | null;
  requires2FA?: boolean;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userName = localStorage.getItem("userName");
  const userId = Number(localStorage.getItem("userId")) || null;

  // --- axios instance ---
  const api = axios.create({ baseURL: "https://erjanhoo.pythonanywhere.com/api" });

  // request interceptor — ставим accessToken
  api.interceptors.request.use((config) => {
    const token = get().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // response interceptor — авто-рефреш при 401
  let isRefreshing = false;
  let refreshSubscribers: ((token: string) => void)[] = [];

  const subscribeTokenRefresh = (cb: (token: string) => void) => refreshSubscribers.push(cb);
  const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  };

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { refreshToken } = get();
        if (!refreshToken) {
          await get().logOut();
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;
        try {
          const { data } = await axios.post(
            "https://erjanhoo.pythonanywhere.com/api/user/token/refresh/",
            { refresh: refreshToken }
          );
          get().setAccessToken(data.access);
          isRefreshing = false;
          onRefreshed(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          await get().logOut();
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  // --- авто-обновление токена каждые 25 минут ---
  setInterval(async () => {
    const { refreshToken } = get();
    if (!refreshToken) return;
    try {
      const { data } = await axios.post(
        "https://erjanhoo.pythonanywhere.com/api/user/token/refresh/",
        { refresh: refreshToken }
      );
      get().setAccessToken(data.access);
      console.debug("Auto-refresh токена успешен");
    } catch (e) {
      console.error("Auto-refresh токена не удался", e);
      await get().logOut();
    }
  }, 25 * 60 * 1000);

  const saveAuthData = (data: { access?: string; refresh?: string; username?: string; user_id?: number }) => {
    if (data.access) localStorage.setItem("accessToken", data.access); else localStorage.removeItem("accessToken");
    if (data.refresh) localStorage.setItem("refreshToken", data.refresh); else localStorage.removeItem("refreshToken");
    if (data.username) localStorage.setItem("userName", data.username); else localStorage.removeItem("userName");
    if (data.user_id) localStorage.setItem("userId", String(data.user_id)); else localStorage.removeItem("userId");

    set({
      accessToken: data.access || null,
      refreshToken: data.refresh || null,
      userName: data.username || null,
      userId: data.user_id || null,
    });
  };

  return {
    userName,
    email: null,
    accessToken,
    refreshToken,
    userId,
    api,

    setAccessToken: (token: string | null) => set({ accessToken: token }),

    signUp: async (newUser) => {
      try {
        const { data } = await api.post("/user/registration/", newUser);
        set({ userId: data.user_id, userName: data.username });
        localStorage.setItem("userId", String(data.user_id));
      } catch (e: any) {
        console.log("SignUp error:", e.response?.data || e.message);
        throw e;
      }
    },

    signIn: async (credentials) => {
      try {
        const { data } = await api.post("/user/login/", credentials);
        if (data.access) saveAuthData(data);
        return data;
      } catch (e: any) {
        console.log("SignIn error:", e.response?.data || e.message);
        return { requires2FA: true };
      }
    },

    verifyRegistration2FA: async (code) => {
      const userId = get().userId;
      if (!userId) throw new Error("Нет userId для 2FA");
      const { data } = await api.post("/user/registration_otp_verification/", { user_id: userId, otp_code: code });
      if (!data.access) throw new Error("Неверный код");
      saveAuthData(data);
    },

    verifyLogin2FA: async (code) => {
      const userId = get().userId;
      if (!userId) throw new Error("Нет userId для 2FA");
      const { data } = await api.post("/user/login_otp_verification/", { user_id: userId, otp_code: code });
      if (!data.access) throw new Error("Неверный код");
      saveAuthData(data);
    },

    logOut: async () => {
      try {
        const refreshToken = get().refreshToken;
        if (refreshToken) {
          await api.post("/user/logout/", { refresh: refreshToken });
        }
      } catch (e) {
        console.log("Logout error:", e);
      } finally {
        saveAuthData({});
      }
    },
  };
});

export const useIsAuth = () => useAuthStore(store => Boolean(store.accessToken));
export const useUserName = () => useAuthStore(store => store.userName);
export const useAccessToken = () => useAuthStore(store => store.accessToken);
export const useSignUp = () => useAuthStore(store => store.signUp);
export const useSignIn = () => useAuthStore(store => store.signIn);
export const useVerifyRegistration2FA = () => useAuthStore(store => store.verifyRegistration2FA);
export const useVerifyLogin2FA = () => useAuthStore(store => store.verifyLogin2FA);
export const useLogOut = () => useAuthStore(store => store.logOut);
