import data from '@/lib/data';
import { DBconnect } from '@/lib/db';
import ProductModel from '@/lib/models/ProductModel';
import UserModel from '@/lib/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { users, products } = data;
  await DBconnect();

  await UserModel.deleteMany();
  await UserModel.insertMany(users);
  
  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);

  return NextResponse.json({
    message: '✅ Database seeded successfully!',
    users,
    products,
  });
};
