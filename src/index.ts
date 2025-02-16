import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import cors from "cors";
import nftRoutes from "./routes/nftRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongo = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use("/api", nftRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "NFT Minting API" });
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

mongoose.connect(mongo as string)
.then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})
.catch((error) => {
  console.log("Failed to connect to datatabase: ", error)
})