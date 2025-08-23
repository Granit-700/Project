export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number,
  name: string;
  image: string;
  original_price: number;
  discounted_price: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  rating: number;
  company: {
    id: number;
    name: string;
    logo: string;
  };
  grams: string;
}
