export type Contact = {
  id: number;
  email: string;
  name: string;
  phone: string
  companies: number[];
};

export type Vendor = {
  id: number;
  name: string;
  products: number[];
};

export type Product = {
  id: number;
  name: string;
  vendor: number;
  companies: number[];
};

