import { Sequelize } from "sequelize";
import { databaseOptions, databaseUrl } from "../config/config";
import { Categories, initCategories } from "./Categories";
import { Products, initProducts } from "./Products";

if (!databaseUrl) {
	console.warn("DATABASE_URL no está configurada; las rutas de productos no podrán conectarse.");
}

const sequelize = new Sequelize(databaseUrl || "postgres://localhost:26257/defaultdb", databaseOptions);

initCategories(sequelize);
initProducts(sequelize);
Products.belongsTo(Categories, { as: "Category", foreignKey: "category_id" });
Categories.hasMany(Products, { as: "Products", foreignKey: "category_id" });

export { Categories, Products, sequelize, Sequelize };