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
    let raw = req.query.raw ? req.query.raw === "true" : false;
    let forNetwork = req.params.forNetwork.toLocaleLowerCase();
    let requests = [];
    let contractsInfo = config.CONTRACTS_INFO;
    if (contractsInfo.length > 0) {
      for (let i = 0; i < contractsInfo.length; i++) { 
        if (forNetwork !== "all" && raw) {
          if(forNetwork === contractsInfo[i].networkName.toLocaleLowerCase() && contractsInfo[i].tokenName.toLocaleLowerCase() === req.params.tokenName.toLocaleLowerCase()){
            requests.push(axiosService.supplyRequest(contractsInfo[i]));
          }
        }else if (contractsInfo[i].tokenName.toLocaleLowerCase() === req.params.tokenName.toLocaleLowerCase()) {
            requests.push(axiosService.supplyRequest(contractsInfo[i]));
          }              
      }


      if (requests.length > 0) {
        let tokensSupplies = await Promise.all(requests);
        let tokensSuppliesInBN = tokensSupplies.map((supplyObject) => {
          let supplyInBN = Web3Helper.toBN(supplyObject.supply, supplyObject.token.decimals);
          supplyObject.supplyInBN = supplyInBN;
          return supplyObject;
        });

        let totalSupply = Web3Helper.countTotalSupply(tokensSuppliesInBN);

        return raw ? res.send(totalSupply)
          : res.send({
              totalSupply,
              totalSupplyByNetworks: createSupplyByNetworksResponse(tokensSuppliesInBN, totalSupply, forNetwork),
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

const createSupplyByNetworksResponse = (tokensSupplies: any, totalSupply: string, forNetwork: string) => {
  let results:any = [];
   tokensSupplies.forEach((supply: any) => {
    if (forNetwork === "all" || forNetwork === supply.token.networkName.toLocaleLowerCase()) {    
      let suplyOnNetwork = Web3.utils.fromWei(supply.supplyInBN, "ether");
      let percentageOfTotalSupply = (Number(suplyOnNetwork) / Number(totalSupply)) * 100;
      results.push({
        network: supply.token.networkName,
        chainId: supply.token.chainId,
        contractaddress: supply.token.contractaddress,
        totalSupply: suplyOnNetwork,
        percentageOfTotalSupply: percentageOfTotalSupply.toFixed(2),
      });
    }
  });
  return results
};

export default {
  getTokenSupply,
};
