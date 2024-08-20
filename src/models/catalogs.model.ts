export interface Catalog {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    brand_id: string;
  }
  export interface CatalogResponse {
    success: boolean;
    response: Catalog[];
  }
  