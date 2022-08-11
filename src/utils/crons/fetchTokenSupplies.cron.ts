import { schedule } from "node-cron";
import config from "../../../config";
import { getTotalTokenSupply, calTokenNonCirculatingSuply, getTokenSuppliesOnNetworks } from "../tokenSupplyCalculator";
import { updateTokenSupply } from "../../services/tokenSupply.service";

async function fetchTokenSupplies(): Promise<void> {
  try {
    await runJob();
    let isLock: boolean = false;
    schedule("*/30 * * * *", async (): Promise<void> => {
      if (!isLock) {
        isLock = true;
        console.log("cron is runing ");
        await runJob();
        isLock = false;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function runJob(): Promise<void> {
  let tokens = getTokens();
  for (const token of tokens) {
    try {
      let tokenContracts = config.CONTRACTS_INFO.filter((contract) => contract.tokenName === token);
      let tokenSupply = await getTotalTokenSupply(tokenContracts, token);
      let nonCirculatingSupply = await calTokenNonCirculatingSuply(tokenContracts);
      let supply = getTokenSuppliesOnNetworks(tokenSupply, nonCirculatingSupply, token);
      await updateTokenSupply(supply);
      console.log(`${supply.tokenName} is updated on database`);
    } catch (error) {
      console.log({ error });
    }
  }
}

function getTokens(): any {
  let tokens = new Set();
  let contractsInfo = config.CONTRACTS_INFO;
  contractsInfo.forEach((contract) => {
    tokens.add(contract.tokenName);
  });
  return [...tokens];
}

export { fetchTokenSupplies };
