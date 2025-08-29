// src/stores/cartStore.ts
import { create } from "zustand";
import { useAuthStore } from "./authStore";

/* --- Типы ответа API --- */
type ApiProduct = {
  id: number;
  name: string;
  image?: string | null;
  original_price?: number | string | null;
  discounted_price?: number | string | null;
  grams?: number | string | null;
};

type ApiCartItem = {
  id: number;
  product: ApiProduct;
  quantity: number;
  total_price?: number | string;
};

type ApiCart = {
  id: number;
  items: ApiCartItem[];
  total_price?: number | string;
};

/* --- Тип, который используют компоненты --- */
export interface CartItem {
  id: number; // product id
  name: string;
  image: string;
  original_price: number;
  grams: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, delta?: number) => Promise<void>;
  increaseQuantity: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
}

const API_MAIN = "https://erjanhoo.pythonanywhere.com/api/product/main_page";

export const useCartStore = create<CartState>((set, get) => {
  const transformItems = (apiItems: ApiCartItem[]): CartItem[] =>
    apiItems.map((apiItem) => {
      const p = apiItem.product || ({} as ApiProduct);
      return {
        id: Number(p.id || 0),
        name: String(p.name || ""),
        image: p.image ? `https://erjanhoo.pythonanywhere.com${p.image}` : "",
        original_price: Number(p.original_price ?? 0),
        grams: String(p.grams ?? ""),
        quantity: Number(apiItem.quantity ?? 0),
      };
    });

  return {
    items: [],

    fetchCart: async () => {
      try {
        const api = useAuthStore.getState().api || null;
        if (!api) return;

        const { data } = await api.get<{ cart: ApiCart }>(API_MAIN);
        const apiItems: ApiCartItem[] = Array.isArray(data.cart?.items) ? data.cart.items : [];
        set({ items: transformItems(apiItems) });
      } catch (e: any) {
        if (e?.response?.status === 401) {
          set({ items: [] });
          return;
        }
        console.error("Ошибка загрузки корзины", e);
        set({ items: [] });
      }
    },

    addToCart: async (productId, delta = 1) => {
      try {
        const api = useAuthStore.getState().api || null;
        if (!api) return;

        const payload = { product_id: productId, quantity: delta };
        const { data } = await api.post<{ id: number; items: ApiCartItem[] }>(
          API_MAIN,
          payload
        );

        if (Array.isArray(data.items)) {
          set({ items: transformItems(data.items) });
        } else {
          await get().fetchCart();
        }
      } catch (e: any) {
        console.error("Ошибка добавления/обновления товара", e, e?.response?.data);
      }
    },

    increaseQuantity: async (productId) => {
      await get().addToCart(productId, 1);
    },

    decreaseQuantity: async (productId) => {
      await get().addToCart(productId, -1);
    },
  };
});

/* --- Селекторы --- */
export const useItems = () => useCartStore(store => store.items);
export const useFetchCart = () => useCartStore(store => store.fetchCart);
export const useAddToCart = () => useCartStore(store => store.addToCart);
export const useIncreaseQty = () => useCartStore(store => store.increaseQuantity);
export const useDecreaseQty = () => useCartStore(store => store.decreaseQuantity);

export const useCartTotalQty = () =>
  useCartStore(store => store.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0));

export const useCartTotalPrice = () =>
  useCartStore(store => store.items.reduce((s, it) => s + (Number(it.original_price) || 0) * (Number(it.quantity) || 0), 0));
