import { Options } from "sequelize";

type DatabaseConfig = Options & { username: string; password: string; database: string };

const config: Record<string, DatabaseConfig> = {
    development: { username: process.env.DB_USER || "root", password: process.env.DB_PASSWORD || "", database: process.env.DB_NAME || "indumentaria_urbana", host: process.env.DB_HOST || "127.0.0.1", dialect: "mysql" },
    test: { username: process.env.DB_USER || "root", password: process.env.DB_PASSWORD || "", database: process.env.DB_NAME || "indumentaria_urbana", host: process.env.DB_HOST || "127.0.0.1", dialect: "mysql" },
    production: { username: process.env.DB_USER || "root", password: process.env.DB_PASSWORD || "", database: process.env.DB_NAME || "indumentaria_urbana", host: process.env.DB_HOST || "127.0.0.1", dialect: "mysql" }
};

export default config;