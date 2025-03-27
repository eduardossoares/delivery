import { ProductItem } from "./foodItem";

export type Order = {
  id: string;
  name: string;
  phone: string;
  street_adress: string;
  number_adress: string;
  reference_adress: string | null;
  note: string | null;
  payment_type: string;
  status: boolean;
  draft: boolean;
  created_at: string;
  updated_at: string;
};

export type OrderDetail = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: ProductItem;
  order: Order;
};
