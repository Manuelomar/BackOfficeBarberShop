"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import GenericForm from '@/components/Generic/GenericForm';
import productService from '@/app/api/Services/productsServices/productServices';
import catalogService from '@/app/api/Services/catalogsServices/catalogsServices';
import { Catalog } from '@/models/catalogs.model';

const CreateProduct: React.FC = () => {
  const router = useRouter();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const { data, error } = await catalogService.getAllCatalogs();
        if (data) {
          setCatalogs(data);
        } else {
          setError(error || 'Failed to load catalogs');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  const fields = [
    { name: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name' },
    { name: 'description', label: 'Product Description', type: 'text', placeholder: 'Enter product description' },
    { name: 'net_price', label: 'Net Price', type: 'number', placeholder: 'Enter net price' },
    { name: 'tax_rate', label: 'Tax Rate', type: 'number', placeholder: 'Enter tax rate' },
    { name: 'discount_rate', label: 'Discount Rate', type: 'number', placeholder: 'Enter discount rate' },
    { name: 'total_price', label: 'Total Price', type: 'number', placeholder: 'Enter total price' },
    {
      name: 'catalog_id',
      label: 'Catalog',
      type: 'select',
      options: catalogs.map((catalog) => ({ label: catalog.name, value: catalog.id })),
      placeholder: 'Select a catalog',
    },
  ];

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { data: newProduct, error } = await productService.addProduct({
        name: data.name,
        description: data.description,
        net_price: parseFloat(data.net_price),
        tax_rate: parseFloat(data.tax_rate),
        discount_rate: parseFloat(data.discount_rate),
        total_price: parseFloat(data.total_price),
        catalog_id: data.catalog_id,
        images: [], // Inicialmente vacío, puede ser manejado posteriormente
      });

      if (newProduct) {
        console.log('Product created successfully!', newProduct);
        router.push('/Pages/product');

      } else {
        console.error('Failed to create product:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Create New Product</h2>
      <GenericForm fields={fields} onSubmit={handleFormSubmit} buttonLabel="Create Product" />
    </div>
  );
};

export default CreateProduct;
