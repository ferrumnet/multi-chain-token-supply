import { TokenSupply } from "../models/tokenSupply.model";

const updateTokenSupply = async (supply: any): Promise<any> => {
  const res = await TokenSupply.updateOne(
    { tokenName: supply.tokenName },
    {
      $set: {
        totalSupply: supply.totalSupply,
        totalCirculatingSupply: supply.totalCirculatingSupply,
        totalNonCirculatingSupply: supply.totalNonCirculatingSupply,
        supplyOnNetworks: supply.supplyOnNetworks,
      },
    },
    { upsert: true }
  );
};

export { updateTokenSupply };
