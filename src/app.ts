import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// apps routes
// app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Qtec-Solution-Limited-Server is running");
});

export default app;
