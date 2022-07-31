import { TokenSupplyDocument, SupplyOnNetworkDocument } from "../interfaces/tokenSupplyDocument.interface";
import mongoose from "mongoose";

const SupplyOnNetworkSchema = new mongoose.Schema<SupplyOnNetworkDocument>({
  chainId: { type: Number, required: true },
  networkName: { type: String, required: true, lowercase: true },
  networkFullName: { type: String, required: true, lowercase: true },
  contractaddress: { type: String, required: true, lowercase: true },
  totalNonCirculatingSupply: { type: String, default: null },
  totalCirculatingSupply: { type: String, default: null },
  totalSupply: { type: String, required: true },
  percentageOfTotalSupply: { type: String, required: true },
});

const tokenSupplySchema = new mongoose.Schema<TokenSupplyDocument>(
  {
    tokenName: { type: String, required: true, lowercase: true },
    totalSupply: { type: String, required: true },
    totalNonCirculatingSupply: { type: String, default: null },
    totalCirculatingSupply: { type: String, default: null },
    supplyOnNetworks: [SupplyOnNetworkSchema],
  },
  { timestamps: true }
);

/**
 * @typedef TokenSupply
 */
export const TokenSupply = mongoose.model<TokenSupplyDocument>("TokenSupply", tokenSupplySchema);
