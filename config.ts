import IContractsInfo from "./src/interfaces/contractsInfo.interface";

const PORT = 8080;

const CONTRACTS_INFO: IContractsInfo[] = [
  {
    networkName: "BSC",
    decimals: 18,
    chainId: 56,
    tokenName: "FRM",
    contractaddress: "0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
    apikey: "28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P",
    getUrl: function () {
      return `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  },
  {
    networkName: "BSC",
    decimals: 18,
    chainId: 56,
    tokenName: "FRMX",
    contractaddress: "0x8523518001ad5d24b2A04e8729743C0643A316c0",
    apikey: "28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P",
    getUrl: function () {
      return `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  }, //etherscan
  {
    networkName: "Ethereum",
    decimals: 18,
    chainId: 1,
    tokenName: "FRMX",
    contractaddress: "0xf6832EA221ebFDc2363729721A146E6745354b14",
    apikey: "XH8PK4M2TB7EKYMNZ4XN5C1N262MYY9E97",
    getUrl: function () {
      return `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  },
  {
    networkName: "Ethereum",
    decimals: 6,
    chainId: 1,
    tokenName: "FRM",
    contractaddress: "0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C",
    apikey: "XH8PK4M2TB7EKYMNZ4XN5C1N262MYY9E97",
    getUrl: function () {
      return `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  },
  //polygonscan
  {
    networkName: "Polygon",
    decimals: 18,
    chainId: 137,
    tokenName: "FRM",
    contractaddress: "0xd99baFe5031cC8B345cb2e8c80135991F12D7130",
    apikey: "4FZ2GIH1Z4UG5HBIXNJ6VR4NA5XZP6F9FE",
    getUrl: function () {
      return `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  },
  {
    networkName: "Polygon",
    decimals: 18,
    chainId: 137,
    tokenName: "FRMX",
    contractaddress: "0x00E197Ac4735F1D6a0a2f0DF3947e6eD86D09260",
    apikey: "4FZ2GIH1Z4UG5HBIXNJ6VR4NA5XZP6F9FE",
    getUrl: function () {
      return `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  },
  //avalanche
  {
    networkName: "Avalanche",
    decimals: 18,
    chainId: 43114,
    tokenName: "FRM",
    contractaddress: "0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C",
    apikey: "H3KUTU2UYFXSZY3UEAUFHDEAABVRQTDD7V",
    getUrl: function () {
      return `https://api.snowtrace.io/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
  },
];
export default {
  PORT,
  CONTRACTS_INFO,
};
