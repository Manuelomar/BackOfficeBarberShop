"use client";

import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/Generic/GenericTable';
import { Catalog } from '@/models/catalogs.model';
import catalogService from '@/app/api/Services/catalogsServices/catalogsServices';
import './catalog.css';
import { useRouter } from 'next-nprogress-bar';

const Catalogs: React.FC = () => {
  const [data, setData] = useState<Catalog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const { data: catalogs, error } = await catalogService.getAllCatalogs();

        console.log("Fetched catalogs:", catalogs); // Log to check the data received

        if (catalogs) {
          setData(catalogs);
          console.log("Catalog data set in state:", catalogs); // Logging the data set in state
        } else {
          throw new Error('No catalogs found');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        console.error("Error fetching catalogs:", err);
      }
    };

    fetchCatalogs();
  }, []);

  const handleAddClick = () => {
    router.push('/Pages/catalog/create');
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Brand ID', accessor: 'brand_id' },
    { header: 'Fecha de Creación', accessor: 'created_at' },
  ];

  interface DataItem {
    [key: string]: any;
  }

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

export default Catalogs;
