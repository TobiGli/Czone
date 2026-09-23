import { ProductCreationAttributes } from "../database/models/Products";
import { Products } from "../database/models";

type ProductInput = Partial<ProductCreationAttributes> & { category?: number };

const toProductData = (data: ProductInput): Partial<ProductCreationAttributes> => ({
    name: data.name,
    slug: data.slug,
    sku: data.sku,
    brand: data.brand,
    gender: data.gender,
    color: data.color,
    material: data.material,
    price: data.price,
    compare_price: data.compare_price,
    category_id: data.category ?? data.category_id,
    description: data.description,
    talles: data.talles,
    stock: data.stock,
    imagen1: data.imagen1,
    imagen2: data.imagen2,
    imagen3: data.imagen3,
    sales_count: data.sales_count,
    is_featured: data.is_featured
});

const service = {
    createProduct: (data: ProductInput) => Products.create(toProductData(data) as ProductCreationAttributes),
    findAll: () => Products.findAll({ include: ["Category"] }),
    findById: (id: number) => Products.findOne({ where: { id } }),
    updateProduct: (id: number, data: ProductInput) => Products.update(toProductData(data), { where: { id } }),
    deleteProduct: (id: number) => Products.destroy({ where: { id } })
};

export default service;