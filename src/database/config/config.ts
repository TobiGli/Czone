import fs from "fs";
import path from "path";
import { Options } from "sequelize";

const caPath = process.env.DB_CA_PATH || path.join(process.env.APPDATA || "", "postgresql", "root.crt");
const sslCa = process.env.DB_SSL_CA || (fs.existsSync(caPath) ? fs.readFileSync(caPath, "utf8") : undefined);

const removeConnectionSslOptions = (value: string): string => {
    try {
        const url = new URL(value);
        ["sslmode", "sslrootcert", "sslcert", "sslkey"].forEach((key) => url.searchParams.delete(key));
        return url.toString();
    } catch {
        return value;
    }
};

export const databaseUrl = process.env.DATABASE_URL
    ? removeConnectionSslOptions(process.env.DATABASE_URL)
    : undefined;

export const databaseOptions: Options = {
    dialect: "postgres",
    logging: false,
    dialectOptions: sslCa
        ? { ssl: { require: true, rejectUnauthorized: true, ca: sslCa } }
        : undefined
};