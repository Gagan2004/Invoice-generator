import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  qty: number;
  rate: number;
}

interface IInvoice extends Document {
  user: Schema.Types.ObjectId;
  products: IProduct[];
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
});

const invoiceSchema = new Schema<IInvoice>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [productSchema],
});

const Invoice = model<IInvoice>('Invoice', invoiceSchema);

export default Invoice;
