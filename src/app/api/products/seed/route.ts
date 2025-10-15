import data from '@/lib/data';
import { getCollection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { users, products } = data;

  const usersCollection = await getCollection('users');
  const productsCollection = await getCollection('products');

  await usersCollection.deleteMany({});
  await productsCollection.deleteMany({});

  await usersCollection.insertMany(users);
  await productsCollection.insertMany(products);

  return NextResponse.json({
    message: '✅ Database seeded successfully!',
    usersCount: users.length,
    productsCount: products.length,
  });
};
