import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env";
import * as schema from "./schema";

export const clinet = postgres(env.DATABASE_URL);
export const db = drizzle(clinet, { schema, logger: true });

