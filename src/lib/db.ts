import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB_URL as string;

if (!MONGODB_URI) {
  throw new Error('⚠️ MongoDB connection string not found in .env');
}

// This helps prevent multiple connections during hot reloads in Next.js
let isConnected = false;

export async function DBconnect() {
  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('🚀 MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
