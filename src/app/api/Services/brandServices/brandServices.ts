import BaseServices from "../BaseServices";
import { Brand, BrandResponse } from "@/models/brands.model";

class brandService {
  async getAllBrands(): Promise<{ data: Brand[] | null, error: string | null }> {
    try {
      const response: Brand[] = await BaseServices.get('/brands');
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred' };
    }
  }

  async addBrand(brandData: Omit<Brand, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Brand | null, error: string | null }> {
    try {
      const response: Brand = await BaseServices.post('/brands', brandData);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred while adding the brand' };
    }
  }

  async updateBrand(brandId: string, brandData: Partial<Omit<Brand, 'id' | 'created_at' | 'updated_at'>>): Promise<{ data: Brand | null, error: string | null }> {
    try {
      const response: Brand = await BaseServices.put(`/brands/${brandId}`, brandData);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred while updating the brand' };
    }
  }
}

export default new brandService();
