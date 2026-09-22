import "dotenv/config";
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
    const databaseError = error as Error & {
        parent?: NodeJS.ErrnoException;
        original?: NodeJS.ErrnoException;
    };
    const databaseUnavailable = error.name === "SequelizeConnectionRefusedError"
        || databaseError.parent?.code === "ECONNREFUSED"
        || databaseError.original?.code === "ECONNREFUSED";
    res.status(500).json({
        error: databaseUnavailable
            ? "No se pudo conectar con la base de datos"
            : "Error interno del servidor"
    });
});

app.listen(port, () => console.log(`Escuchando en puerto ${port}`));

export default app;