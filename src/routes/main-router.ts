import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import mainController from "../controllers/main-controller";

const router = Router();
const asyncHandler = (handler: RequestHandler): RequestHandler =>
	(request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(handler(request, response, next)).catch(next);
	};

router.get("/", mainController.home);
router.get("/coleccion", mainController.collection);
router.get("/ofertas", mainController.offers);
router.get("/contacto", mainController.contact);
router.post("/products", asyncHandler(mainController.productCreate));
router.get("/products", asyncHandler(mainController.productsList));
router.get("/products/:id", asyncHandler(mainController.productDetail));
router.put("/products/:id", asyncHandler(mainController.productUpdate));
router.delete("/products/:id", asyncHandler(mainController.productDelete));

export default router;