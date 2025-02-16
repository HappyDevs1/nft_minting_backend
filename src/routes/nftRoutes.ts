import express, { Request, Response } from "express";
import { storeNft, getNftById, getUserGallery } from "../controllers/nftController";

const router = express.Router();

router.post("/nfts", storeNft);
router.get("/nfts/:id", getNftById);
router.get("/nfts/gallery/:address", getUserGallery);

export default router;