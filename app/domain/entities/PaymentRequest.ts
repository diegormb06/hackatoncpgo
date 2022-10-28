import { Address } from "./Address";
import { User } from "./User";

import { OrderProduct } from "./OrderProduct";

export type PaymentRequest = {
  order_id: number;
  user: User;
  ship_address: Address;
  freight: number;
  total_value: number;
  total_quantity: number;
  items: OrderProduct;
};
