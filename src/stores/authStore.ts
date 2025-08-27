import axios from "axios";
import { create } from "zustand";

interface State {
  userName: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null
  signUp: (newUser: { username: string; email: string; password: string; }) => Promise<void>;
  signIn: (credentials: { email: string; password: string; }) => Promise<AuthResponse>;
  twoFA: (code: string) => Promise<void>;
  logOut: () => void
};

interface AuthResponse {
  access?: string;
  refresh?: string;
}

export const useAuthStore = create<State>((set, get) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return {
    userName: null,
    email: null,
    accessToken,
    refreshToken,
    userId: null,
    signUp: async (newUser) => {
      try {
        const { data } = await axios.post(
          "https://erjanhoo.pythonanywhere.com/api/user/registration/",
          newUser
        );
        console.log(data);
        set({ userName: data.username, userId: data.user_id });
      } catch (e: any) {
        console.log("2FA error:", e.response?.data || e.message);
      }
    },
    signIn: async (credentials): Promise<AuthResponse> => {
      try {
        const { data } = await axios.post(
          "https://erjanhoo.pythonanywhere.com/api/user/login/",
          credentials
        );
        console.log(data);
        if (data.access && data.refresh) {
          set(() => {
            if (data.access !== null) {
              localStorage.setItem("accessToken", data.access);
            } else localStorage.removeItem("accessToken");

            if (data.refresh !== null) {
              localStorage.setItem("refreshToken", data.refresh);
            } else localStorage.removeItem("refreshToken");

            return {
              accessToken: data.access,
              refreshToken: data.refresh
            };
          });
        };
        return data;
      } catch (e: any) {
        console.log("2FA error:", e.response?.data || e.message);
        return {};
      }
    },
    twoFA: async (code) => {
      try {
        const { data } = await axios.post(
          "https://erjanhoo.pythonanywhere.com/api/user/registration_otp_verification/",
          {
            user_id: get().userId,
            otp_code: code
          }
        );

        if (!data.access) throw new Error("Неверный код"); // пробрасываем ошибку 

        console.log(data);
        console.log(data.access);
        console.log(data.refresh);

        set(() => {
          if (data.access !== null) {
            localStorage.setItem("accessToken", data.access);
          } else localStorage.removeItem("accessToken");

          if (data.refresh !== null) {
            localStorage.setItem("refreshToken", data.refresh);
          } else localStorage.removeItem("refreshToken");

          return {
            accessToken: data.access,
            refreshToken: data.refresh
          };
        });
      } catch (e: any) {
        console.log("2FA error:", e.response?.data || e.message);
        throw e;
      }
    },
    logOut: () => {
      set({ accessToken: null, refreshToken: null });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  };
});

export const useIsAuth = () => useAuthStore((store) => Boolean(store.accessToken));
export const useUserName = () => useAuthStore((store) => store.userName)
export const useAccessToken = () => useAuthStore((store) => store.accessToken);

export const useSignUp = () => useAuthStore((store) => store.signUp);
export const useSignIn = () => useAuthStore((store) => store.signIn);
export const useLogOut = () => useAuthStore((store) => store.logOut);
