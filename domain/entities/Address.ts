export type Address = {
  id?: number;
  user_id: number;
  address: string;
  zipcode: number;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  created_at?: Date;
  updated_at?: Date;
};
