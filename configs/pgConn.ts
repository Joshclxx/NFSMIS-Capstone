import {Pool} from "pg"
import { env } from "./env";
export const db = new Pool({
  connectionString:
    env.dbStr||
    "postgresql://neondb_owner:npg_1yze5ChIrPNg@ep-billowing-leaf-a1pv45r9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});
