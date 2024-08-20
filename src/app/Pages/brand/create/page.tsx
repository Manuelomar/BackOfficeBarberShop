"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Cambiar la importación aquí
import { SubmitHandler, FieldValues } from 'react-hook-form';
import GenericForm from '@/components/Generic/GenericForm';
import brandService from '@/app/api/Services/brandServices/brandServices';

const CreateBrand: React.FC = () => {
  const router = useRouter();

  // Define los campos del formulario
  const fields = [
    { name: 'name', label: 'Brand Name', type: 'text', placeholder: 'Enter brand name' },
    { name: 'logo_url', label: 'Logo URL', type: 'url', placeholder: 'Enter logo URL' },
  ];

  // Función para manejar el envío del formulario
  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Genera la fecha actual automáticamente
      const createdAt = new Date().toISOString();

      // Usa el servicio brandService para agregar la nueva marca
      const { data: newBrand, error } = await brandService.addBrand({
        name: data.name,
        logo_url: data.logo_url,
      });

      if (newBrand) {
        console.log('Brand created successfully!', newBrand);
        router.push('/Pages/brand');
      } else {
        console.error('Failed to create brand:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Brand</h2>
      <GenericForm fields={fields} onSubmit={handleFormSubmit} buttonLabel="Create Brand" />
    </div>
  );
};

export default CreateBrand;
