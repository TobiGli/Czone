import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize";
import type { Categories } from "./Categories";

export interface ProductAttributes {
    id: number;
    name: string;
    price: number;
    category_id: number;
    talles?: string;
    description?: string;
    stock?: number;
    imagen1?: string;
    imagen2?: string;
    imagen3?: string;
}

export type ProductCreationAttributes = Optional<ProductAttributes, "id">;

export class Products extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    declare id: number;
    declare name: string;
    declare price: number;
    declare category_id: number;
    declare talles: string;
    declare description: string;
    declare stock: number;
    declare imagen1: string;
    declare imagen2: string;
    declare imagen3: string;
    declare Category?: Categories;
    declare static associations: { Category: Association<Products, Categories> };
}

export function initProducts(sequelize: Sequelize): typeof Products {
    Products.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(255), allowNull: false },
        price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        talles: DataTypes.STRING(255),
        description: DataTypes.STRING(255),
        stock: DataTypes.INTEGER.UNSIGNED,
        imagen1: DataTypes.STRING(255),
        imagen2: DataTypes.STRING(255),
        imagen3: DataTypes.STRING(255)
    }, { sequelize, tableName: "products", timestamps: false });
    return Products;
}