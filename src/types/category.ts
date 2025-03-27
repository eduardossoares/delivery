import { ProductItem } from "./foodItem";

export interface Category {
  id: string
  name: string
  products: ProductItem[]
};