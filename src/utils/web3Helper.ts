import Web3 from "web3";
import BN from "bn.js";
import etherUnitsHelper from "./etherUnitsHelper";

const toWeiConversion = (value: BN, decimals: number) => {
  if (decimals != 18) {
    const unit: any = etherUnitsHelper.getUnitByDecimal(decimals);
    if (unit) {
      return Web3.utils.toWei(value, unit.name);
    }
  }
  return value;
};

const toBN = (supply: string, decimals: number) => {
  let BNValue = Web3.utils.toBN(supply);
  return toWeiConversion(BNValue, decimals);
};

const countTotalSupply = (tokens: any) => {
  let total = Web3.utils.toBN(0);
  tokens.forEach((token: any) => {
    total = total.add(token.supplyInBN);
  });
  return Web3.utils.fromWei(total, "ether");
};

export default {
  countTotalSupply,
  toWeiConversion,
  toBN,
};
