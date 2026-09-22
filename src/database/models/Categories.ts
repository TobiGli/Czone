import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import type { Products } from "./Products";

interface CategoryAttributes { id: number; type: string; subtype?: string; }
type CategoryCreationAttributes = Optional<CategoryAttributes, "id">;

export class Categories extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    declare id: number;
    declare type: string;
    declare subtype: string;
    declare Products?: Products[];
}

export function initCategories(sequelize: Sequelize): typeof Categories {
    Categories.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        type: { type: DataTypes.STRING(255), allowNull: false },
        subtype: DataTypes.STRING(255)
    }, { sequelize, tableName: "categories", timestamps: false });
    return Categories;
}