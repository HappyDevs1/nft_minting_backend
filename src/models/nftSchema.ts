import mongoose, { Document, Schema } from "mongoose";

export interface INft extends Document {
  name: string;
  description: string;
  logoUrl: string;
  nftId: number;
  ownerAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const NftSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String, required: true },
  nftId: { type: Number, required: true },
  ownerAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});

const Nft = mongoose.models.Nft || mongoose.model<INft>("Nft", NftSchema);

export default Nft;