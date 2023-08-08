import dotenv from "dotenv";
import { PoolConfig } from "pg";

dotenv.config;

const { DBNAME, DBPASS, DBUSER, ENV, HOST, URI } = process.env;

const postgresConfig: PoolConfig = {
  host: HOST,
  user: DBUSER,
  database: DBNAME,
  password: DBPASS,
  port: 5432,
  // connectionString: URI,
  max: 2,
  idleTimeoutMillis: 120000,
  connectionTimeoutMillis: 12000,
};

const config = {
  environment: ENV,
  postgresConfig,
};

export default config;
