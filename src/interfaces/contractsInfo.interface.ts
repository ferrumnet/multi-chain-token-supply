interface IContractsInfo {
  networkName: string;
  networkFullName: string;
  decimals: number;
  chainId: number;
  tokenName: string;
  contractaddress: string;
  apikey: string;
  getUrl: () => string;
}

export default IContractsInfo;
