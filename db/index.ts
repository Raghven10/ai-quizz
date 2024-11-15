

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString)
export const db = drizzle(client, {schema});