import { Pool } from 'pg';

const connectionString = String(process.env.DATABASE_URL || '').trim();
const useSsl = process.env.DATABASE_SSL === 'true' || /sslmode=require/i.test(connectionString);

const createPool = () => {
  if (!connectionString) return null;

  return new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX) || 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 8000,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });
};

const globalForDatabase = globalThis;

export const db = globalForDatabase.dosalgaStorefrontPool || createPool();

if (db) {
  globalForDatabase.dosalgaStorefrontPool = db;
}

export const isDatabaseConfigured = () => Boolean(connectionString);

export const query = async (text, params = []) => {
  if (!db) {
    throw new Error('DATABASE_URL is not configured for the storefront catalog.');
  }

  return db.query(text, params);
};

export const withTransaction = async (callback) => {
  if (!db) {
    throw new Error('DATABASE_URL is not configured for the storefront catalog.');
  }

  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
