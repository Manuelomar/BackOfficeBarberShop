"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import GenericForm from '@/components/Generic/GenericForm';
import catalogService from '@/app/api/Services/catalogsServices/catalogsServices';
import brandService from '@/app/api/Services/brandServices/brandServices';
import { Brand } from '@/models/brands.model';

const CreateCatalog: React.FC = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data, error } = await brandService.getAllBrands();
        if (data) {
          setBrands(data);
        } else {
          setError(error || 'Failed to load brands');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const fields = [
    { name: 'name', label: 'Catalog Name', type: 'text', placeholder: 'Enter catalog name' },
    {
      name: 'brand_id',
      label: 'Brand',
      type: 'select',
      options: brands.map((brand) => ({ label: brand.name, value: brand.id })), // Mapear las marcas a opciones
      placeholder: 'Select a brand',
    },
  ];

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { data: newCatalog, error } = await catalogService.addCatalog({
        name: data.name,
        brand_id: data.brand_id,
      });

      if (newCatalog) {
        console.log('Catalog created successfully!', newCatalog);
        router.push('/Pages/catalog');
      } else {
        console.error('Failed to create catalog:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen las marcas
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Mostrar un mensaje de error si falla la carga de marcas
  }

  return (
    <div className="container mt-5">
      <h2>Create New Catalog</h2>
      <GenericForm fields={fields} onSubmit={handleFormSubmit} buttonLabel="Create Catalog" />
    </div>
  );
};

export default CreateCatalog;
