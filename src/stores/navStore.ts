import { create } from "zustand";
import type { Category } from "../types";
import axios from "axios";

interface State {
  categories: Category[];
  selectedCategory: string;            // выбранная категория
  getCategories: () => Promise<void>;
  setSelectedCategory: (name: string) => void;
};

export const useCategoryStore = create<State>((set) => {
  return {
    categories: [],
    selectedCategory: "нет данных",
    getCategories: async () => {
      try {
        const { data: { categories } } = await axios.get(
          "https://erjanhoo.pythonanywhere.com/api/product/main_page"
        );
        console.log(categories);
        set({ categories });

        if (categories.length > 0) {
          set({ selectedCategory: categories[0].name }); // сразу выставляем первую
        }
      } catch (e) {
        console.log(e);
      };
    },
    setSelectedCategory: (name: string) => set({ selectedCategory: name })
  };
});

export const useCategories = () => useCategoryStore((store) => store.categories);
export const useSelectedCategory = () => useCategoryStore((store) => store.selectedCategory);

export const useGetCategories = () => useCategoryStore((store) => store.getCategories);
export const useSetSelectedCategory = () => useCategoryStore((store) => store.setSelectedCategory);
