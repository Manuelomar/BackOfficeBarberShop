import { Catalog, CatalogResponse } from "@/models/catalogs.model";
import BaseServices from "../BaseServices";
import { AxiosResponse } from "axios"; // Importa el tipo AxiosResponse

class catalogService {
  async getAllCatalogs(): Promise<{ data: Catalog[] | null, error: string | null }> {
    try {
      const response: Catalog[] = await BaseServices.get('/catalogs');
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred' };
    }
  }

  async addCatalog(catalogData: Omit<Catalog, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Catalog | null, error: string | null }> {
    try {
      const response: Catalog = await BaseServices.post('/catalogs', catalogData);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred while adding the catalog' };
    }
  }

  async updateCatalog(catalogId: string, catalogData: Partial<Omit<Catalog, 'id' | 'created_at' | 'updated_at'>>): Promise<{ data: Catalog | null, error: string | null }> {
    try {
      const response: Catalog = await BaseServices.put(`/catalogs/${catalogId}`, catalogData);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'An unexpected error occurred while updating the catalog' };
    }
  }
}

export default new catalogService();
