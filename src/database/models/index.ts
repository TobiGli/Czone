import { Sequelize } from "sequelize";
import config from "../config/config";
import { Categories, initCategories } from "./Categories";
import { Products, initProducts } from "./Products";

const settings = config[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(settings.database, settings.username, settings.password, settings);

initCategories(sequelize);
initProducts(sequelize);
Products.belongsTo(Categories, { as: "Category", foreignKey: "category_id" });
Categories.hasMany(Products, { as: "Products", foreignKey: "category_id" });

export { Categories, Products, sequelize, Sequelize };