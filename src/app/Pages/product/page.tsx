"use client";

import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/Generic/GenericTable';
import { Product } from '@/models/product.model';
import productService from '@/app/api/Services/productsServices/productServices';
import './product.css';
import { useRouter } from 'next-nprogress-bar';

const Products: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: products, error } = await productService.getAllCatalogs();

        console.log("Fetched products:", products); // Log to check the data received

        if (products) {
          setData(products);
          console.log("Product data set in state:", products); // Logging the data set in state
        } else {
          throw new Error('No products found');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddClick = () => {
    router.push('/Pages/product/create');
  };

  interface DataItem {
    [key: string]: any;
  }
  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Descripción', accessor: 'description' },
    { header: 'Precio Neto', accessor: 'net_price' },
    { header: 'Precio Total', accessor: 'total_price' },
    { header: 'ID del Catálogo', accessor: 'catalog_id' },
  ];

  const handleEdit = (item: DataItem) => {
    console.log('Editar', item);
  };


  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="button-container">
        <button type="button" className="btn btn-primary" onClick={handleAddClick}>
          Agregar
        </button>
        </div>
      <GenericTable
        columns={columns}
        data={data}
        headerTheme="dark"
        onEdit={handleEdit}
        />
    </div>
  );
};

export default Products;
