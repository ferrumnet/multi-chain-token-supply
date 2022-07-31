interface SupplyOnNetworkDocument {
  chainId: number;
  networkName: string;
  networkFullName: string;
  contractaddress: string;
  totalSupply: string;
  percentageOfTotalSupply: string;
  totalNonCirculatingSupply: string;
  totalCirculatingSupply: string;
}

interface TokenSupplyDocument {
  tokenName: string;
  totalSupply: string;
  totalNonCirculatingSupply: string;
  totalCirculatingSupply: string;
  supplyOnNetworks: [SupplyOnNetworkDocument];
}

export { TokenSupplyDocument, SupplyOnNetworkDocument };
