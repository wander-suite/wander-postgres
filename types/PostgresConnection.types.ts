import { ConnectionOptions } from "tls";
import pgTypes from "pg-types";
import stream from "stream";

export interface ClientConfig {
  user?: string | undefined;
  database?: string | undefined;
  password?: string | (() => string | Promise<string>) | undefined;
  port?: number | undefined;
  host?: string | undefined;
  connectionString?: string | undefined;
  keepAlive?: boolean | undefined;
  stream?: stream.Duplex | undefined;
  statement_timeout?: false | number | undefined;
  ssl?: boolean | ConnectionOptions | undefined;
  query_timeout?: number | undefined;
  keepAliveInitialDelayMillis?: number | undefined;
  idle_in_transaction_session_timeout?: number | undefined;
  application_name?: string | undefined;
  connectionTimeoutMillis?: number | undefined;
  types?: CustomTypesConfig | undefined;
  options?: string | undefined;
}

export interface PoolConfig extends ClientConfig {
  // properties from module 'node-pool'
  max?: number | undefined;
  min?: number | undefined;
  idleTimeoutMillis?: number | undefined;
  log?: ((...messages: any[]) => void) | undefined;
  Promise?: PromiseConstructorLike | undefined;
  allowExitOnIdle?: boolean | undefined;
  maxUses?: number | undefined;
  logQueries?: boolean;
}

export interface CustomTypesConfig {
  getTypeParser: typeof pgTypes.getTypeParser;
}
