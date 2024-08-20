
"use client"; 

import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/Generic/GenericTable';
import { Brand } from '@/models/brands.model';
import brandService from '@/app/api/Services/brandServices/brandServices';
import './brand.css';
import { useRouter } from 'next-nprogress-bar';
const Brands: React.FC = () => {
    const [data, setData] = useState<Brand[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); 
  
    useEffect(() => {
      const fetchBrands = async () => {
        const { data, error } = await brandService.getAllBrands();
        if (data) {
          setData(data);
        } else {
          setError(error || 'An error occurred');
        }
      };
  
      fetchBrands();
    }, []);
  
    const handleAddClick = () => {
      router.push('/Pages/brand/create');
    };
  
    interface DataItem {
      [key: string]: any;
    }
  
    const columns = [
      { header: 'Nombre', accessor: 'name' },
      { header: 'Logo', accessor: 'logo_url' },
      { header: 'Fecha', accessor: 'created_at' },
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
  
  export default Brands;