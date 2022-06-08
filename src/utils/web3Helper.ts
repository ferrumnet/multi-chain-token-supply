import Web3 from "web3";

const toWeiConversion = (value:any, decimals:number) =>{
    if(decimals != 18){
       return Web3.utils.toWei(value, 'microether')
    }
    return value
}

const toBN = (supply:any) => {
   let BNValue = Web3.utils.toBN(supply.tokens)
   return toWeiConversion(BNValue, supply.decimals)
}

export default {
    toWeiConversion,
    toBN,
}