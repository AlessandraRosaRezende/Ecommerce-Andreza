import express, { Request, Response } from "express";
import helloRouter from "./routes/helloRouter.js";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => res.json({ message: "Hello World" }));
app.use("/hello", helloRouter);

export default app;