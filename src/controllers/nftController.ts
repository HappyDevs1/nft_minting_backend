import { Request, Response } from "express";
import Nft from "../models/nftSchema";

export const storeNft = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { name, description, logoUrl, nftId, ownerAddress } = req.body;

    if (!name || !logoUrl || !nftId || !ownerAddress) {
      return res.status(400).json({error: "Missing required fields" })
    }

    const newNft = await Nft.create({
      name,
      description: description || "",
      logoUrl,
      nftId,
      ownerAddress: ownerAddress
    });

    res.status(201).json(newNft)
  } catch (error) {
    if ((error as any).code === 11000) { // Duplicate key error
      return res.status(409).json({ error: 'NFT ID already exists' });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getNftById = async (req: Request, res: Response) : Promise<any> => {
  try {
    const nft = await Nft.findOne({ nftId: req.params.id });

    if (!nft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    res.status(200).json(nft);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getUserGallery = async (req: Request, res: Response) : Promise<any> => {
  try {
    const nfts = await Nft.find({ ownerAddress: req.params.address });
    
    res.status(200).json(nfts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}