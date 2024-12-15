export type Organization = {
  id: number;
  companies: number[];
};

export type Company = {
  id: number;
  ekultur_id: string;
  hort_name: string
  name: string;
  isMember: boolean;
  noticeHCERT: boolean;
  organization_number: string;
  organization: number;
  contacts: number[];
  products: number[];
};

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

