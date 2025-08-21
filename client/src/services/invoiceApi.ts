import axios from 'axios';

const API_URL = '/api/invoices';

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
