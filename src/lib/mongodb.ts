import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;

export async function getMongoClient() {
  if (!uri) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new MongoClient(uri);
  await cachedClient.connect();

  return cachedClient;
}
