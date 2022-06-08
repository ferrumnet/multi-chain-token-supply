import { Request, Response } from "express";
import Web3Helper from "../utils/web3Helper";
import Web3 from "web3";
import axiosService from "../services/axios.service";

const networks = [
  {
    network: "bscscan",
    decimals: 18,
    url: "https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc&apikey=28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P",
  },
  {
    network: "etherscan",
    decimals: 6,
    url: "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C&apikey=XH8PK4M2TB7EKYMNZ4XN5C1N262MYY9E97",
  },
  {
    network: "polygonscan",
    decimals: 18,
    url: "https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=0xd99baFe5031cC8B345cb2e8c80135991F12D7130&apikey=4FZ2GIH1Z4UG5HBIXNJ6VR4NA5XZP6F9FE",
  },
  {
    network: "snowtrace",
    decimals: 18,
    url: "https://api.snowtrace.io/api?module=stats&action=tokensupply&contractaddress=0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C&apikey=H3KUTU2UYFXSZY3UEAUFHDEAABVRQTDD7V",
  },
];

const getTokenSupply = async (req: Request, res: Response): Promise<any> => {
  let requests = [];
  for (let i = 0; i < networks.length; i++)
    requests.push(
      axiosService.supplyRequest(networks[i].url, networks[i].decimals)
    );

  let tokensSupplies = await Promise.all(requests);
  let tokensSuppliesInBN = tokensSupplies.map((token) =>
    Web3Helper.toBN(token)
  );

  let total = Web3.utils.toBN(0);
  tokensSuppliesInBN.forEach((supplyBN) => {
    total = total.add(supplyBN);
  });
  const result = Web3.utils.fromWei(total, "ether");
  return res.json({ result });
};

export default {
  getTokenSupply,
};
