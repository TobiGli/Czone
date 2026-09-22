import express, { NextFunction, Request, Response } from "express";
import path from "path";
import mainRouter from "./routes/main-router";

const app = express();
const port = Number(process.env.PORT) || 3418;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const publicPath = path.join(process.cwd(), "public");
app.use("/public", express.static(publicPath));
app.use(express.static(publicPath));
app.use(mainRouter);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(port, () => console.log(`Escuchando en puerto ${port}`));

export default app;