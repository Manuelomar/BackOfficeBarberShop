export interface  Brand {
    id: string;
    name: string;
    logo_url: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface BrandResponse {
    success: boolean;
    response: Brand[];
  }