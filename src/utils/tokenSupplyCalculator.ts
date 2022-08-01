import Web3Helper from "./web3Helper";
import axiosService from "../services/axios.service";
import ApiError from "./ApiError";
import httpStatus from "http-status";
import BN from "bn.js";

const calTokenCirculatingSuply = (tokenTotalSupply: BN, nonCirculatingSuply: BN) => {
  let circulatingSupplyInBN = tokenTotalSupply.sub(nonCirculatingSuply);
  return Web3Helper.weiToEtherConversion(circulatingSupplyInBN);
};

const calTokenNonCirculatingSuply = async (tokenContracts: any): Promise<any> => {
  let nonCirculatingSupplyOnNetworks = [];
  let nonCirculatingSupply = null;
  for (let i = 0; i < tokenContracts.length; i++) {
    nonCirculatingSupply = await calTokenNonCirculatingSuplyOnNetworkInBN(tokenContracts[i]);
    if (nonCirculatingSupply !== null) {
      nonCirculatingSupplyOnNetworks.push({ supplyInBN: nonCirculatingSupply, chainId: tokenContracts[i].chainId });
    }
  }
  return nonCirculatingSupplyOnNetworks;
};

const calTokenNonCirculatingSuplyOnNetworkInBN = async (tokenContract: any): Promise<any> => {
  let chunksPromises: Promise<any>[] = [];
  if (tokenContract.nonCirculatingAddresses) {
    let chunks = sliceIntoChunks(tokenContract.nonCirculatingAddresses, 4);
    for (let j = 0; j < chunks.length; j++) {
      chunksPromises.push(
        new Promise((resolve, reject) =>
          setTimeout(function () {
            resolve({ balances: createWaletAddressBalancesRequest(chunks[j], tokenContract), token: tokenContract });
          }, 1700 * j)
        )
      );
    }
  }

  if (chunksPromises.length > 0) {
    let chunksSupplies = await Promise.all(chunksPromises);
    let sum = Web3Helper.toBN("0", 18);
    for (let i = 0; i < chunksSupplies.length; i++) {
      let suplies = await Promise.all(chunksSupplies[i].balances);
      for (let j = 0; j < suplies.length; j++) {
        sum = sum.add(Web3Helper.toBN(suplies[j], chunksSupplies[i].token.decimals));
      }
    }
    return sum;
  }
  return null;
};

function sliceIntoChunks(nonCirculatingAddresses: any[], chunkSize: number) {
  const res = [];
  if (nonCirculatingAddresses.length > 0) {
    if (nonCirculatingAddresses.length > chunkSize) {
      for (let i = 0; i < nonCirculatingAddresses.length; i += chunkSize) {
        const chunk = nonCirculatingAddresses.slice(i, i + chunkSize);
        res.push(chunk);
      }
    } else {
      res.push(nonCirculatingAddresses);
    }
  }
  return res;
}

const createWaletAddressBalancesRequest = (nonCirculatingAddresses: string[], contract: any) => {
  let requests: any[] = [];
  nonCirculatingAddresses.forEach((nonCirculatingAddress: string) => {
    requests.push(axiosService.getWalletTokenBalance(nonCirculatingAddress, contract));
  });
  return requests;
};

const getTotalTokenSupply = async (contractsInfo: any, tokenName: string): Promise<any> => {
  let requests = [];
  if (contractsInfo.length > 0) {
    for (let i = 0; i < contractsInfo.length; i++) {
      requests.push(axiosService.supplyRequest(contractsInfo[i]));
    }

    if (requests.length > 0) {
      let tokensSupplies = await Promise.all(requests);
      let tokensSuppliesInBN = tokensSupplies.map((supplyObject) => {
        let supplyInBN = Web3Helper.toBN(supplyObject.supply, supplyObject.token.decimals);
        supplyObject.supplyInBN = supplyInBN;
        return supplyObject;
      });

      return tokensSuppliesInBN;
    }
    throw new ApiError(httpStatus.NOT_FOUND, `${tokenName} token configuration not found in config.ts`);
  }
  throw new ApiError(httpStatus.NOT_FOUND, "Please Configure Tokens information in config.ts file");
};

const getTokenSuppliesOnNetworks = (tokensSupplies: any, tokenNonCirculatingSuply: any, tokenName: string) => {
  let totalNonCirculatingSupply = null;
  let totalCirculatingSupply = null;
  let totalWeiSupplyInBN = Web3Helper.countTotalSupplyInWei(tokensSupplies);
  let totalSupply = Web3Helper.weiToEtherConversion(totalWeiSupplyInBN);
  let results: any = [];

  tokensSupplies.forEach((supply: any) => {
    let suplyOnNetwork = Web3Helper.weiToEtherConversion(supply.supplyInBN); // can be problem ? decimals
    let percentageOfTotalSupply = (Number(suplyOnNetwork) / Number(totalSupply)) * 100;
    let data: any = {
      networkName: supply.token.networkName,
      networkFullName: supply.token.networkFullName,
      chainId: supply.token.chainId,
      contractaddress: supply.token.contractaddress,
      totalSupply: suplyOnNetwork,
      percentageOfTotalSupply: percentageOfTotalSupply.toFixed(2),
    };

    //find nonCirculatingSupplies on network
    if (tokenNonCirculatingSuply.length > 0) {
      let totalWeiNonCirculatingSuplyInBN = Web3Helper.countTotalSupplyInWei(tokenNonCirculatingSuply);
      totalNonCirculatingSupply = Web3Helper.weiToEtherConversion(totalWeiNonCirculatingSuplyInBN);
      totalCirculatingSupply = calTokenCirculatingSuply(totalWeiSupplyInBN, totalWeiNonCirculatingSuplyInBN);

      let networkNonCirculatingSuplyInBN = tokenNonCirculatingSuply.find((tokenNonCirculatingSupply: any) => tokenNonCirculatingSupply.chainId === supply.token.chainId);
      if (networkNonCirculatingSuplyInBN) {
        data.totalCirculatingSupply = calTokenCirculatingSuply(supply.supplyInBN, networkNonCirculatingSuplyInBN.supplyInBN);
        data.totalNonCirculatingSupply = Web3Helper.weiToEtherConversion(networkNonCirculatingSuplyInBN.supplyInBN);
      }
    }

    results.push(data);
  });
  return { supplyOnNetworks: results, totalSupply, tokenName, totalNonCirculatingSupply, totalCirculatingSupply };
};

export { getTotalTokenSupply, calTokenNonCirculatingSuply, calTokenCirculatingSuply, getTokenSuppliesOnNetworks };
