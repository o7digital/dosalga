import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;
const connectionString = String(process.env.DATABASE_URL || '').trim();
const useSsl = process.env.DATABASE_SSL === 'true' || /sslmode=require/i.test(connectionString);

if (!connectionString) {
  throw new Error('DATABASE_URL is required.');
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const migrationPath = path.join(scriptDirectory, '..', 'db', 'migrations', '001_storefront_catalog.sql');
const migration = await fs.readFile(migrationPath, 'utf8');
const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

try {
  await pool.query(migration);
  console.log('Storefront catalog database migration complete.');
} finally {
  await pool.end();
}
