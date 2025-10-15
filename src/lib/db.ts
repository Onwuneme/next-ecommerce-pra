import { MongoClient, ServerApiVersion, Db } from 'mongodb';

if (!process.env.DB_URL) {
  throw new Error('MongoDB connection string (DB_URL) not found');
}

const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance: Db | null = null;

async function getDB(dbName: string) {
  if (dbInstance) return dbInstance;
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB('Ecommerce-pra');
  return db.collection(collectionName);
}
