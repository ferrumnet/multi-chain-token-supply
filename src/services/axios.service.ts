import axios from "axios";

const supplyRequest = async (token: any): Promise<any> => {
  const response = await axios.get(token.getUrl());
  let supply = "0";
  if (response.status === 200) supply = response.data.result;
  return { supply, token };
};

// const tokenHoldersBalancesRequest = async (token: any): Promise<any> => {
//   console.log(token.getTokenHoldersUrl());
//   const response = await axios.get(token.getTokenHoldersUrl());
//   let holders = "0";
//   if (response.status === 200) holders = response.data.result;
//   return { holders, token };
// };

const getWalletTokenBalance = async (address: string, token: any): Promise<any> => {
  const response = await axios.get(token.getWalletTokenBalanceUrl(address));
  let balance = null;
  if (response.status === 200) balance = response.data.result;
  return balance;
};
export default {
  supplyRequest,
  getWalletTokenBalance,
};
