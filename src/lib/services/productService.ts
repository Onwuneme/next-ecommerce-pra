import { cache } from 'react';
import { DBconnect } from '../db';
import ProductModel, { Product } from '../models/ProductModel';

export const revalidate = 60 * 60; // revalidate every 1 hour

const getLatest = cache(async () => {
  await DBconnect();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(4)
    .lean();

  return products;
});

const getFeatured = cache(async () => {
  await DBconnect();
  const products = await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean();
  return products;
});

const getSlug = cache(async (slug: string) => {
  await DBconnect();
  const products = await ProductModel.findOne({ slug }).lean();
  return products;
});

const productService = {
  getLatest,
  getFeatured,
  getSlug,
};
export default productService;
