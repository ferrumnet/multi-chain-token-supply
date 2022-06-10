import { Request, Response } from "express";
import Web3Helper from "../utils/web3Helper";
import Web3 from "web3";
import axiosService from "../services/axios.service";
import config from "../../config";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const getTokenSupply = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    let requests = [];
    let contractsInfo = config.CONTRACTS_INFO;
    if (contractsInfo.length > 0) {
      for (let i = 0; i < contractsInfo.length; i++) {
        if (contractsInfo[i].tokenName === req.params.tokenName) {
          requests.push(axiosService.supplyRequest(contractsInfo[i]));
        }
      }

      if (requests.length > 0) {
        let tokensSupplies = await Promise.all(requests);

        let tokensSuppliesInBN = tokensSupplies.map((supplyObject) => {
          let supplyInBN = Web3Helper.toBN(
            supplyObject.supply,
            supplyObject.token.decimals
          );
          supplyObject.supplyInBN = supplyInBN;
          return supplyObject;
        });

        let totalSupply = Web3Helper.countTotalSupply(tokensSuppliesInBN);

        return res.send({
          totalSupply,
          totalSupplyByNetworks: createSupplyByNetworksResponse(
            tokensSuppliesInBN,
            totalSupply
          ),
        });
      }
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `${req.params.tokenName} token configuration not found in config.ts`
      );
    }
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Please Configure Tokens information in config.ts file"
    );
  }
);

const createSupplyByNetworksResponse = (
  tokensSupplies: any,
  totalSupply: string
) => {
  return tokensSupplies.map((supply: any) => {
    let suplyOnNetwork = Web3.utils.fromWei(supply.supplyInBN, "ether");
    let percentageOfTotalSupply =
      (Number(suplyOnNetwork) / Number(totalSupply)) * 100;
    return {
      network: supply.token.networkName,
      chainId: supply.token.chainId,
      contractaddress: supply.token.contractaddress,
      totalSupply: suplyOnNetwork,
      percentageOfTotalSupply: percentageOfTotalSupply.toFixed(2),
    };
  });
};

export default {
  getTokenSupply,
};
