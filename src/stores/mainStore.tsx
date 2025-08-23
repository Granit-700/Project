import { create } from "zustand";
import type { Product } from "../types"
import axios from "axios";

interface State {
  products: Product[];
  getProducts: () => Promise<void>
};

export const useProductStore = create<State>((set) => {
  return {
    products: [],
    getProducts: async () => {
      try {
        const { data: { products } } = await axios.get(
          "https://erjanhoo.pythonanywhere.com/api/product/main-page/"
        );
        console.log(products);
        set({
          products: products
        });
      } catch (e) {
        console.log(e);
      };
    },
  };
});

export const useProducts = () => useProductStore((store) => store.products);

export const useGetProducts = () => useProductStore((store) => store.getProducts);
