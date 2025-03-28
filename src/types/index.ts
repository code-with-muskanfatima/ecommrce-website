export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "men" | "women";
  subCategory: string;
  image: string;
  sizes: string[];
  color: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
