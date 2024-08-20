import BaseServices from "../BaseServices";
import { Product, ProductResponse } from "@/models/product.model";

class productService {

  async getAllCatalogs(): Promise<{ data: Product[] | null, error: string | null }> {
    try {
      const response: Product[] = await BaseServices.get('/products');
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred' };
    }
  }
  async addProduct(productData: Omit<Product, 'id'>): Promise<{ data: Product | null, error: string | null }> {
    try {
      const response: Product = await BaseServices.post('/products', productData);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred while adding the product' };
    }
  }
}

export default new productService();
