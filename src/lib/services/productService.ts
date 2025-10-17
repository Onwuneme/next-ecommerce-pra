import { cache } from 'react';
import { DBconnect } from '../db';
import ProductModel, { Product } from '../models/ProductModel';

export const revalidate = 60 * 60; // revalidate every 1 hour

const getLatest = cache(async () => {
  await DBconnect();
  const product = await ProductModel.find({}).sort({ _id: -1 }).limit(4).lean();
  return JSON.parse(JSON.stringify(product)) as Product[];
});

const getFeatured = cache(async () => {
  await DBconnect();
  const product = await ProductModel.find({ isFeatured: true }).limit(3).lean();
  return JSON.parse(JSON.stringify(product)) as Product[];
});

const getSlug = cache(async (slug: string) => {
  await DBconnect();
  const product = await ProductModel.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(product)) as Product;
});

const productService = {
  getLatest,
  getFeatured,
  getSlug,
};
export default productService;
