export const config = {
  env: process.env.NODE_ENV,
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.PORT || "8080"),

  accessLog: {
    format: process.env.ACCESS_LOG_FORMAT ?? "dev",
    file: process.env.ACCESS_LOG_FILE,
  },

  mongo: {
    url: process.env.MONGO_URL || "mongodb://localhost:27017",
    dbName: process.env.MONGO_DB_NAME || "sharely",
  },

  engine: {
    version: process.env.ENGINE_VERSION ?? "1.0.0",
  },
  jwtSecret: process.env.JWT_SECRET ?? "",
};
