import axios from 'axios';
import { API_BASE_URL } from '../utils/apiBase';

const API_URL = `${API_BASE_URL}/api/invoices`;

const generatePdf = async (products: any[], token: string) => {
  const response = await axios.post(`${API_URL}/generate-pdf`, { products }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });
  return response.data;
};

const invoiceService = {
  generatePdf,
};

export default invoiceService;
