export interface Product {
    id: string;
    name: string;
    description: string;
    net_price: number;
    tax_rate: number;
    discount_rate: number;
    total_price: number;
    catalog_id: string;
    images: string[];
  }
  
  export interface ProductResponse {
    success: boolean;
    response: Product[];
  }
  