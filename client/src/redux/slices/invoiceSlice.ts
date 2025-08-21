import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  qty: number;
  rate: number;
}

interface InvoiceState {
  products: Product[];
}

const initialState: InvoiceState = {
  products: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct = {
        id: new Date().toISOString(),
        ...action.payload,
      };
      state.products.push(newProduct);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = invoiceSlice.actions;
export default invoiceSlice.reducer;
