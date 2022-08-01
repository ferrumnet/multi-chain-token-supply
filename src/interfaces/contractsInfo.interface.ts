interface IContractsInfo {
  networkName: string;
  networkFullName: string;
  decimals: number;
  chainId: number;
  tokenName: string;
  contractaddress: string;
  apikey: string;
  nonCirculatingAddresses: string[];
  getUrl: () => string;
  getWalletTokenBalanceUrl?: (walletAddress: string) => string;
}

export default IContractsInfo;
