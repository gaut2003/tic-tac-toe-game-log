import express from "express";
import gameRouter from "./routes/game-route.js";
import cors from "cors";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", gameRouter);

export { app };