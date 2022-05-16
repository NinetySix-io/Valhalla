export interface ConsulAppConfig {
  port: number;
  grpcPort: number;
}

export interface ConsulServiceConfig {
  app: ConsulAppConfig;
  database: ConsulDatabaseConfig;
}

export interface ConsulDatabaseConfig {
  mongodb: ConsulMongodbConfig;
  eventStore: ConsulEventStoreConfig;
  redis: ConsulRedisConfig;
}

export interface ConsulMongodbConfig {
  uri: string;
  name: string;
  options: string;
}

export interface ConsulEventStoreConfig {
  poolMax: number;
  poolMin: number;
  streamProtocol: string;
  hostname: string;
  httpPort: number;
  httpProtocol: string;
  tcpPassword: string;
  tcpUsername: string;
  tcpPort: number;
  tcpProtocol: string;
}

export interface ConsulRedisConfig {
  host: string;
  port: string;
  password: string;
}
