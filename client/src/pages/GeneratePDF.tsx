import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import invoiceService from '../services/invoiceApi';

const GeneratePDF: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.invoice);
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const subTotal = products.reduce((acc, product) => acc + product.qty * product.rate, 0);
  const gst = subTotal * 0.18;
  const grandTotal = subTotal + gst;

  const handleGeneratePdf = async () => {
    if (!token) {
      setError('You must be logged in to generate a PDF.');
      return;
    }

    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const pdfBlob = await invoiceService.generatePdf(products, token);
      const url = window.URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Invoice Details</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Products</h3>
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center py-2 border-b">
              <span>{product.name}</span>
              <span>{product.qty} x ${product.rate.toFixed(2)}</span>
              <span>${(product.qty * product.rate).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1">
              <span>Sub Total:</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>GST (18%):</span>
              <span>${gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold py-2 border-t mt-2">
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleGeneratePdf}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate PDF'}
          </button>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download="invoice.pdf"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Download PDF
            </a>
          )}
        </div>
        {error && <p className="text-red-500 text-center text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default GeneratePDF;
