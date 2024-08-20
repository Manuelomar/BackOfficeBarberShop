

import axios from 'axios';

const API_BASE_URL = 'https://dev.d2u9d4uoaslip6.amplifyapp.com/api/';

const baseServices = axios.create({
  baseURL: API_BASE_URL
});

baseServices.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response.data.response;
    } else {
      throw new Error(response.data.message || 'An error occurred while fetching the data');
    }
  },
  error => {
    console.error('API Error:', error.response ? error.response.data : 'Unknown error');
    return Promise.reject(error);
  }
);

export default baseServices;
