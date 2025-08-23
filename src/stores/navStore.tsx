import { create } from "zustand";
import type { Category } from "../types";
import axios from "axios";

interface State {
  categories: Category[];
  getCategories: () => Promise<void>;
};

export const useCategoryStore = create<State>((set) => {
  return {
    categories: [],
    getCategories: async () => {
      try {
        const { data: { categories } } = await axios.get(
          "https://erjanhoo.pythonanywhere.com/api/product/main-page/"
        );
        console.log(categories);
        set({
          categories: categories
        });
      } catch (e) {
        console.log(e);
      };
    }
  };
});

export const useCategories = () => useCategoryStore((store) => store.categories);

export const useGetCategories = () => useCategoryStore((store) => store.getCategories);
