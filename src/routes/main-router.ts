import { Router } from "express";
import mainController from "../controllers/main-controller";

const router = Router();

router.get("/", mainController.home);
router.post("/products", mainController.productCreate);
router.get("/products", mainController.productsList);
router.get("/products/:id", mainController.productDetail);
router.put("/products/:id", mainController.productUpdate);
router.delete("/products/:id", mainController.productDelete);

export default router;