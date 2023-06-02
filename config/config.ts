import dotenv from "dotenv";
import { PoolConfig } from "../types/PostgresConnection.types";
import { queries } from "../src/queries";

dotenv.config;

const { DBNAME, DBPASS, DBUSER, ENV, HOST, URI } = process.env;

const postgresConfig: PoolConfig = {
  host: HOST || "127.0.0.1",
  user: DBUSER,
  database: DBNAME,
  password: DBPASS,
  port: 5432,
  // connectionString: URI,
  max: 2,
  idleTimeoutMillis: 120000,
  connectionTimeoutMillis: 12000,
  queries,
};

const config = {
  environment: ENV,
  postgresConfig,
};

export default config;
