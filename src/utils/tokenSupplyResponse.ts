const filterByNetwork = (supplyOnNetworks: any, forNetwork: any) => {
  return supplyOnNetworks.filter(
    (supplyOnNetwork: any) => supplyOnNetwork.networkName === forNetwork || supplyOnNetwork.networkFullName === forNetwork || supplyOnNetwork.chainId === parseInt(forNetwork)
  );
};
const prespareResponseByTypeRaw = (totalSupply: any, totalSupplyByNetworks: any, responseType: string, forNetwork: string) => {
  let response: any = {};
  switch (responseType) {
    case "tokenCirculatingSupply":
      response = forNetwork === "all" ? totalSupply.totalCirculatingSupply : totalSupplyByNetworks[0].totalCirculatingSupply;
      break;
    case "tokenNonCirculatingSupply":
      response = forNetwork === "all" ? totalSupply.totalNonCirculatingSupply : totalSupplyByNetworks[0].totalNonCirculatingSupply;
      break;
    case "tokenTotalSupply":
      response = forNetwork === "all" ? totalSupply.totalSupply : totalSupplyByNetworks[0].totalSupply;
      break;
    default:
      response = forNetwork === "all" ? totalSupply.totalSupply : totalSupplyByNetworks[0].totalSupply;
  }
  return response;
};
const prespareResponseByType = (totalSupply: any, totalSupplyByNetworks: any, responseType: string) => {
  let responseObject: any = {};
  switch (responseType) {
    case "tokenCirculatingSupply":
      responseObject.totalCirculatingSupply = totalSupply.totalCirculatingSupply;
      responseObject.totalSupplyByNetworks = totalSupplyByNetworks.map((supply: any) => pick(supply, ["networkName", "chainId", "contractaddress", "totalCirculatingSupply"]));
      break;
    case "tokenNonCirculatingSupply":
      responseObject.totalNonCirculatingSupply = totalSupply.totalNonCirculatingSupply;
      responseObject.totalSupplyByNetworks = totalSupplyByNetworks.map((supply: any) => pick(supply, ["networkName", "chainId", "contractaddress", "totalNonCirculatingSupply"]));

      break;
    case "tokenTotalSupply":
      responseObject.totalSupply = totalSupply.totalSupply;
      responseObject.totalSupplyByNetworks = totalSupplyByNetworks.map((supply: any) => pick(supply, ["networkName", "chainId", "contractaddress", "totalSupply", "percentageOfTotalSupply"]));
      break;
    default:
      responseObject.totalSupply = totalSupply.totalSupply;
      responseObject.totalNonCirculatingSupply = totalSupply.totalNonCirculatingSupply;
      responseObject.totalCirculatingSupply = totalSupply.totalCirculatingSupply;
      responseObject.totalSupplyByNetworks = totalSupplyByNetworks.map((supply: any) =>
        pick(supply, ["networkName", "chainId", "contractaddress", "totalSupply", "percentageOfTotalSupply", "totalNonCirculatingSupply", "totalCirculatingSupply"])
      );
  }
  return responseObject;
};

const prepareSupplyResponse = (totalSupply: any, forNetwork: string, raw: boolean, responseType: string) => {
  if (forNetwork !== "all") {
    let totalSupplyByNetworks = filterByNetwork(totalSupply.supplyOnNetworks, forNetwork);
    if (totalSupplyByNetworks.length > 0) {
      return raw ? prespareResponseByTypeRaw(totalSupply, totalSupplyByNetworks, responseType, forNetwork) : prespareResponseByType(totalSupply, totalSupplyByNetworks, responseType);
    }
  } else if (forNetwork === "all") {
    return raw ? prespareResponseByTypeRaw(totalSupply, totalSupply.supplyOnNetworks, responseType, forNetwork) : prespareResponseByType(totalSupply, totalSupply.supplyOnNetworks, responseType);
  }
  return false;
};

const pick = (object: any, keys: any) => {
  let result: any = {};
  keys.forEach((key: string) => {
    if (object[key]) {
      result[key] = object[key];
    }
  });
  return result;
};

export { prepareSupplyResponse };
