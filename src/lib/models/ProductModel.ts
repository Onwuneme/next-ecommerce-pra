import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  banner: { type: String },
  price: { type: Number, required: true },
  brand: { type: String },
  description: { type: String },
  category: { type: String },
  rating: { type: Number, default: 0 },
  countInStock: { type: Number, default: 0 },
  colors: [String],
  size: [String],
  isFeatured: { type: Boolean, default: false },
});

// Prevent model overwrite issue in Next.js
const ProductModel = models.Product || model('Product', productSchema);


export type Product = {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  banner?: string;
  price: number;
  brand: string;
  description: string;
  category: string;
  rating: number;
  countInStock: number;
  colors?: string[];
  size?: string[];
};

export default ProductModel;