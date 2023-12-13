module.exports = (sequelize, DataTypes) => {
    let alias = "Products";

    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            // AUTO_INCREMENT -> autoIncrement
            autoIncrement: true,
            // PRIMARY KEY -> primaryKey
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            // NOT NULL -> allowNull
            // allowNull: false
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            // NOT NULL -> allowNull
            // allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            // NOT NULL -> allowNull
            // allowNull: false
        },
        talles: {
            type: DataTypes.STRING(255)
        },
        description: {
           type: DataTypes.STRING(255)
        },
        stock: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        talles: {
            type: DataTypes.STRING(255)
        },
        imagen1: {
            type: DataTypes.STRING(255)    
        },
        imagen2: {
            type: DataTypes.STRING(255)
        },
        imagen3: {
            type: DataTypes.STRING(255)
        }

        
    };

    let config = {
        tableName: "products",
        timestamps: false, // CREATED_AT UPDATED_AT DELETED_AT
    };

    const Model = sequelize.define(alias, cols, config);

    Model.associate = (models) => {
        // Si la relacion es uno a uno -> hasOne
        // uno a muchos -> hasMany
        // muchos a uno -> belongsTo
        // muchos a muchos -> belongsToMany
        Model.belongsTo(models.Categories, {
            as: 'Category',
            foreignKey: 'category_id'
        })
    }

    return Model;
}