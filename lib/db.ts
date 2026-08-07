import mysql, { type Pool, type PoolConnection } from "mysql2/promise";

let pool: Pool | undefined;

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: required("DATABASE_HOST"),
      port: Number(process.env.DATABASE_PORT || 3306),
      database: required("DATABASE_NAME"),
      user: required("DATABASE_USER"),
      password: required("DATABASE_PASSWORD"),
      ssl: process.env.DATABASE_SSL === "true" ? {} : undefined,
      connectionLimit: 10,
      decimalNumbers: false,
      enableKeepAlive: true,
    });
  }
  return pool;
}

export async function inTransaction<T>(
  run: (connection: PoolConnection) => Promise<T>,
) {
  const connection = await getDb().getConnection();
  try {
    await connection.beginTransaction();
    const result = await run(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
