// import { useState, useEffect } from 'react';
// import brandService from '@/services/brandService';

// function useBrands() {
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadBrands = async () => {
//     setLoading(true);
//     try {
//       const brandsData = await brandService.getAllBrands();
//       setBrands(brandsData);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       setBrands([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBrands();
//   }, []);

//   const createBrand = async (brandData) => {
//     setLoading(true);
//     try {
//       const newBrand = await brandService.createBrand(brandData);
//       setBrands([...brands, newBrand]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateBrand = async (brandId, brandData) => {
//     setLoading(true);
//     try {
//       const updatedBrand = await brandService.updateBrand(brandId, brandData);
//       const newBrands = brands.map(brand => brand.id === brandId ? updatedBrand : brand);
//       setBrands(newBrands);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteBrand = async (brandId) => {
//     setLoading(true);
//     try {
//       await brandService.deleteBrand(brandId);
//       const newBrands = brands.filter(brand => brand.id !== brandId);
//       setBrands(newBrands);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { brands, loading, error, createBrand, updateBrand, deleteBrand };
// }

// export default useBrands;
