import { Address } from "./Address";
import { OrderProduct } from "./OrderProduct";

export type PaymentRequest = {
  user_id: string;
  ship_address: Address;
  freight: number;
  total_value: number;
  total_quantity: number;
  items: OrderProduct;
};
