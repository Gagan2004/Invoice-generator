// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addProduct, removeProduct } from '../redux/slices/invoiceSlice';
// import type { RootState, AppDispatch } from '../redux/store';

// const AddProducts: React.FC = () => {
//   const [productName, setProductName] = useState('');
//   const [productQty, setProductQty] = useState(1);
//   const [productRate, setProductRate] = useState(0);

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { products } = useSelector((state: RootState) => state.invoice);

//   const productTotal = productQty * productRate;
//   const productGST = productTotal * 0.18;

//   const handleAddProduct = () => {
//     if (productName && productQty > 0 && productRate > 0) {
//       dispatch(addProduct({ name: productName, qty: productQty, rate: productRate }));
//       setProductName('');
//       setProductQty(1);
//       setProductRate(0);
//     }
//   };

//   const handleNext = () => {
//     navigate('/generate-pdf');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6">Add Products to Invoice</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700">Product Name</label>
//             <input
//               type="text"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Qty</label>
//             <input
//               type="number"
//               value={productQty}
//               onChange={(e) => setProductQty(Number(e.target.value))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Rate</label>
//             <input
//               type="number"
//               value={productRate}
//               onChange={(e) => setProductRate(Number(e.target.value))}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             onClick={handleAddProduct}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Add Product
//           </button>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-semibold border-b pb-2 mb-4">Products</h3>
//           {products.map((product) => (
//             <div key={product.id} className="flex justify-between items-center py-2 border-b">
//               <span>{product.name}</span>
//               <span>{product.qty} x ${product.rate.toFixed(2)}</span>
//               <span>${(product.qty * product.rate).toFixed(2)}</span>
//               <button
//                 onClick={() => dispatch(removeProduct(product.id))}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end mt-8">
//           <button
//             onClick={handleNext}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             disabled={products.length === 0}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProducts;






import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, removeProduct } from '../redux/slices/invoiceSlice';
import type { RootState, AppDispatch } from '../redux/store';
import invoiceService from '../services/invoiceApi';

import { logout } from '../redux/slices/authSlice';

const AddProducts: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState(1);
  const [productRate, setProductRate] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.invoice);
  const { token } = useSelector((state: RootState) => state.auth);

  // PDF generation states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const productTotal = productQty * productRate;
  const productGST = productTotal * 0.18;

  // Calculate totals
  const subtotal = products.reduce((sum, product) => sum + (product.qty * product.rate), 0);
  const gstAmount = subtotal * 0.18;
  const totalWithGST = subtotal + gstAmount;

  const handleAddProduct = () => {
    if (productName && productQty > 0 && productRate > 0) {
      dispatch(addProduct({ name: productName, qty: productQty, rate: productRate }));
      setProductName('');
      setProductQty(1);
      setProductRate(0);
    }
  };

  const handleNext = () => {
    navigate('/generate-pdf');
  };

  const handleGeneratePdf = async () => {
    if (!token) {
      setError('You must be logged in to generate a PDF.');
      return;
    }

    if (products.length === 0) {
      setError('Please add at least one product before generating PDF.');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center mr-3">
                <div className="w-6 h-6 bg-gray-800 rounded-sm transform rotate-45"></div>
              </div>
              <div>
                <h1 className="text-white text-lg font-medium">levitation</h1>
                <p className="text-gray-400 text-xs">infotech</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Title and Description */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Add Products</h2>
          <p className="text-gray-400">
            This is basic login page which is used for levitation assignment purpose.
          </p>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter the product name"
              className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 px-4 py-3 rounded focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Product Price</label>
            <input
              type="number"
              value={productRate}
              onChange={(e) => setProductRate(Number(e.target.value))}
              placeholder="Enter the price"
              className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 px-4 py-3 rounded focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              value={productQty}
              onChange={(e) => setProductQty(Number(e.target.value))}
              placeholder="Enter the Qty"
              className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 px-4 py-3 rounded focus:outline-none focus:border-green-400"
            />
          </div>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAddProduct}
            className="bg-gray-700 hover:bg-gray-600 text-green-400 font-medium py-3 px-6 rounded flex items-center gap-2 border border-gray-600"
          >
            Add Product
            <div className="w-5 h-5 border-2 border-green-400 rounded-full flex items-center justify-center">
              <span className="text-green-400 text-xs">+</span>
            </div>
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 flex items-center gap-2">
                  Product name
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Price</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 flex items-center justify-center gap-2">
                  Quantity
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Total Price</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="bg-gray-800 text-white">
                  <td className="px-6 py-4 text-sm">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-center">{product.rate}</td>
                  <td className="px-6 py-4 text-sm text-center">{product.qty}</td>
                  <td className="px-6 py-4 text-sm text-center">INR {(product.qty * product.rate).toFixed(0)}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <button
                      onClick={() => dispatch(removeProduct(product.id))}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              
              {products.length > 0 && (
                <>
                  <tr className="bg-gray-800 text-white">
                    <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium">Sub-Total</td>
                    <td className="px-6 py-4 text-sm text-center">INR {subtotal.toFixed(1)}</td>
                    <td></td>
                  </tr>
                  <tr className="bg-gray-800 text-white">
                    <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium">Incl + GST 18%</td>
                    <td className="px-6 py-4 text-sm text-center">INR {totalWithGST.toFixed(1)}</td>
                    <td></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Generate PDF Button */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handleGeneratePdf}
            disabled={products.length === 0 || loading}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-green-400 font-medium py-3 px-8 rounded border border-gray-600 disabled:border-gray-700"
          >
            {loading ? 'Generating...' : 'Generate PDF Invoice'}
          </button>
          
          {pdfUrl && (
            <a
              href={pdfUrl}
              download="invoice.pdf"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded border border-green-600"
            >
              Download PDF
            </a>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex justify-center mt-4">
            <p className="text-red-400 text-sm bg-red-900 bg-opacity-20 border border-red-400 rounded px-4 py-2">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProducts;