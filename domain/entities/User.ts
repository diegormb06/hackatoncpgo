import { Address } from "./Address";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  phone: string;
  role: "admin" | "shop" | "user";
  token: string;
  address: Address[];
};
