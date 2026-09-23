import "dotenv/config";
import { Categories, Products, sequelize } from "./models";

const categories = [
    { type: "remera", subtype: "manga corta" },
    { type: "remera", subtype: "manga larga" },
    { type: "calzado", subtype: "zapatillas" },
    { type: "calzado", subtype: "botas" },
    { type: "pantalon", subtype: "jean" },
    { type: "pantalon", subtype: "jogger" }
];

async function setupDatabase(): Promise<void> {
    await sequelize.authenticate();
    await sequelize.sync();

    if (await Categories.count() === 0) {
        await Categories.bulkCreate(categories);
    }

    if (await Products.count() === 0) {
        const categoryRows = await Categories.findAll({ order: [["id", "ASC"]] });
        const categoryByType = new Map(categoryRows.map((category) => [category.type, category.id]));

        await Products.bulkCreate([
            {
                name: "Remera de algodon",
                type: "remera",
                category_id: categoryByType.get("remera")!,
                price: 500,
                description: "Remera de algodon con cuello redondo",
                talles: "S,M,L,XL",
                stock: 10,
                imagen1: "remera1.png"
            },
            {
                name: "Zapatillas deportivas",
                type: "calzado",
                category_id: categoryByType.get("calzado")!,
                price: 1500,
                description: "Zapatillas deportivas con suela de goma",
                talles: "36,37,38,39,40,41,42,43,44,45",
                stock: 5,
                imagen1: "zapattillas1.png"
            },
            {
                name: "Pantalon de jean",
                type: "pantalon",
                category_id: categoryByType.get("pantalon")!,
                price: 1000,
                description: "Pantalon de jean con corte recto",
                talles: "28,29,30,31,32,33,34,35,36",
                stock: 8,
                imagen1: "buzo1.png"
            }
        ]);
    }

    console.log(`Base lista: ${await Categories.count()} categorias, ${await Products.count()} productos.`);
}

setupDatabase()
    .catch((error) => {
        console.error("No se pudo preparar la base de datos:", error.message);
        process.exitCode = 1;
    })
    .finally(() => sequelize.close());