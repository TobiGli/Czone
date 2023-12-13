const {Products, Categories} = require('../database/models/index');

const service = {
    createProduct: async (data) => {
        let newProduct = {
            name: data.name,
            price: data.price,
            category_id: data.category,
            description: data.description,
            talles: data.talles,
            stock: data.stock,
            imagen1: data.imagen1,
            imagen2: data.imagen2,
            imagen3: data.imagen3
        };
        Products.create(newProduct);
    }, // C

    findAll: async () => {
        let prods = await Products.findAll({
            include: ["Category"]
        });
        console.log(prods);
        return prods;
    }, // R
    findById: async (id) => {
        let productFound = Products.findOne({
            where: {
                id: id
            }
        })
        return productFound;
    }, // R

    updateProduct: async (id, data) => {
        let newData = {
            name: data.name,
            price: data.price,
            category_id: data.category,
            description: data.description,
            talles: data.talles,
            stock: data.stock,
            imagen1: data.imagen1,
            imagen2: data.imagen2,
            imagen3: data.imagen3
        };

        let resultado = Products.update(newData, {
            where: {
                id: id
            }
        });

        return resultado;
    }, // U

    deleteProduct: async (id) => {
        let resultado = Products.destroy({
            where: {
                id: id
            }
        });

        return resultado;
    } // D
};

module.exports = service;