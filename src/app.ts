import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://qtec-solution-limited-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// apps routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Qtec-Solution-Limited-Server is running");
});

export default app;
