import { Request, Response } from "express";
import path from "path";
import Products from "../services/product";

const getId = (request: Request): number => Number(request.params.id);

const controller = {
    home: (_req: Request, res: Response) => {
        res.sendFile(path.join(process.cwd(), "src", "views", "home.html"));
    },
    collection: (_req: Request, res: Response) => {
        res.sendFile(path.join(process.cwd(), "src", "views", "collection.html"));
    },
    offers: (_req: Request, res: Response) => {
        res.sendFile(path.join(process.cwd(), "src", "views", "offers.html"));
    },
    productCreate: async (req: Request, res: Response) => {
        if (!req.body.name || req.body.price === undefined) {
            return res.status(400).json({ error: "name y price son obligatorios" });
        }
        const product = await Products.createProduct(req.body);
        return res.status(201).json({ code: 201, msg: "Creacion exitosa", product });
    },
    productsList: async (_req: Request, res: Response) => {
        return res.json(await Products.findAll());
    },
    productDetail: async (req: Request, res: Response) => {
        const product = await Products.findById(getId(req));
        return product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" });
    },
    productUpdate: async (req: Request, res: Response) => {
        const [updated] = await Products.updateProduct(getId(req), req.body);
        return updated > 0 ? res.json({ message: "Edicion exitosa" }) : res.status(404).json({ error: "Producto no encontrado" });
    },
    productDelete: async (req: Request, res: Response) => {
        const deleted = await Products.deleteProduct(getId(req));
        return deleted > 0 ? res.json({ message: "Borrado exitoso" }) : res.status(404).json({ error: "Producto no encontrado" });
    }
};

export default controller;