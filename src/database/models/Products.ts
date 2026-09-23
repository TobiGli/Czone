import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize";
import type { Categories } from "./Categories";

export interface ProductAttributes {
    id: number;
    name: string;
    slug?: string;
    sku?: string;
    brand?: string;
    gender?: string;
    color?: string;
    material?: string;
    price: number;
    compare_price?: number;
    category_id: number;
    type?: string;
    talles?: string;
    description?: string;
    stock?: number;
    sales_count?: number;
    is_featured?: boolean;
    imagen1?: string;
    imagen2?: string;
    imagen3?: string;
}

export type ProductCreationAttributes = Optional<ProductAttributes, "id">;

export class Products extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    declare id: number;
    declare name: string;
    declare slug: string;
    declare sku: string;
    declare brand: string;
    declare gender: string;
    declare color: string;
    declare material: string;
    declare price: number;
    declare compare_price: number;
    declare category_id: number;
    declare type: string;
    declare talles: string;
    declare description: string;
    declare stock: number;
    declare sales_count: number;
    declare is_featured: boolean;
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
        slug: DataTypes.STRING(255),
        sku: DataTypes.STRING(80),
        brand: DataTypes.STRING(120),
        gender: DataTypes.STRING(40),
        color: DataTypes.STRING(80),
        material: DataTypes.STRING(120),
        price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        compare_price: DataTypes.INTEGER.UNSIGNED,
        category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        type: DataTypes.STRING(100),
        talles: DataTypes.STRING(255),
        description: DataTypes.STRING(255),
        stock: DataTypes.INTEGER.UNSIGNED,
        sales_count: DataTypes.INTEGER.UNSIGNED,
        is_featured: DataTypes.BOOLEAN,
        imagen1: DataTypes.STRING(255),
        imagen2: DataTypes.STRING(255),
        imagen3: DataTypes.STRING(255)
    }, { sequelize, tableName: "products", timestamps: false });
    return Products;
}