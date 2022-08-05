import IContractsInfo from "./src/interfaces/contractsInfo.interface";

const PORT = 8080;

const CONTRACTS_INFO: IContractsInfo[] = [
  {
    networkName: "BSC",
    networkFullName: "BinanceSmartChain",
    decimals: 18,
    chainId: 56,
    tokenName: "FRM",
    contractaddress: "0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
    apikey: "28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P",
    nonCirculatingAddresses: [
      "0x517873ca1edaaa0f6403a0dab2cb0162433de9d1", //Deployer Address
      "0xaf329a957653675613d0d98f49fc93326aeb36fc", // CFRM
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
    ],
    getUrl: function () {
      return `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  },
  {
    networkName: "BSC",
    networkFullName: "BinanceSmartChain",
    decimals: 18,
    chainId: 56,
    tokenName: "FRMX",
    contractaddress: "0x8523518001ad5d24b2A04e8729743C0643A316c0",
    apikey: "28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P",
    nonCirculatingAddresses: [
      "0x517873ca1edaaa0f6403a0dab2cb0162433de9d1", //Deployer Address
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
      "0x1fC45F358D5292bEE1e055BA7CebE4d4100972AE", //CFRMX
    ],
    getUrl: function () {
      return `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  }, //etherscan
  {
    networkName: "ETH",
    networkFullName: "Ethereum",
    decimals: 18,
    chainId: 1,
    tokenName: "FRMX",
    contractaddress: "0xf6832EA221ebFDc2363729721A146E6745354b14",
    apikey: "XH8PK4M2TB7EKYMNZ4XN5C1N262MYY9E97",
    nonCirculatingAddresses: [
      "0xc2fdcb728170192c72ada2c08957f2e9390076b7", //Deployer Address
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
    ],
    getUrl: function () {
      return `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  },
  {
    networkName: "ETH",
    networkFullName: "Ethereum",
    decimals: 6,
    chainId: 1,
    tokenName: "FRM",
    contractaddress: "0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C",
    apikey: "XH8PK4M2TB7EKYMNZ4XN5C1N262MYY9E97",
    nonCirculatingAddresses: [
      "0xc2fdcb728170192c72ada2c08957f2e9390076b7", //Deployer Address
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
    ],
    getUrl: function () {
      return `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  },
  //polygonscan
  {
    networkName: "MATIC",
    networkFullName: "Polygon",
    decimals: 18,
    chainId: 137,
    tokenName: "FRM",
    contractaddress: "0xd99baFe5031cC8B345cb2e8c80135991F12D7130",
    apikey: "4FZ2GIH1Z4UG5HBIXNJ6VR4NA5XZP6F9FE",
    nonCirculatingAddresses: [
      "0xc2fdcb728170192c72ada2c08957f2e9390076b7", //Deployer Address
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
    ],
    getUrl: function () {
      return `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  },
  {
    networkName: "MATIC",
    networkFullName: "Polygon",
    decimals: 18,
    chainId: 137,
    tokenName: "FRMX",
    contractaddress: "0x00E197Ac4735F1D6a0a2f0DF3947e6eD86D09260",
    apikey: "4FZ2GIH1Z4UG5HBIXNJ6VR4NA5XZP6F9FE",
    nonCirculatingAddresses: [
      "0xc2fdcb728170192c72ada2c08957f2e9390076b7", //Deployer Address
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
    ],
    getUrl: function () {
      return `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  },
  //avalanche
  {
    networkName: "AVAX",
    networkFullName: "Avalanche",
    decimals: 18,
    chainId: 43114,
    tokenName: "FRM",
    contractaddress: "0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C",
    apikey: "H3KUTU2UYFXSZY3UEAUFHDEAABVRQTDD7V",
    nonCirculatingAddresses: [
      "0xc2fdcb728170192c72ada2c08957f2e9390076b7", //Deployer Address
      "0x8e01cc26d6dd73581347c4370573ce9e59e74802", //Bridge Pool
    ],
    getUrl: function () {
      return `https://api.snowtrace.io/api?module=stats&action=tokensupply&contractaddress=${this.contractaddress}&apikey=${this.apikey}`;
    },
    getWalletTokenBalanceUrl: function (walletAddress: string) {
      return `https://api.snowtrace.io/api?module=account&action=tokenbalance&contractaddress=${this.contractaddress}&address=${walletAddress}&apikey=${this.apikey}`;
    },
  },
];
export default {
  PORT,
  CONTRACTS_INFO,
};
