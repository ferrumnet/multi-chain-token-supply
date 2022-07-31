import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { prepareSupplyResponse } from "../utils/tokenSupplyResponse";
import httpStatus from "http-status";

import { TokenSupply } from "../models/tokenSupply.model";

const getTotalTokenSupply = catchAsync(async (req: Request, res: Response): Promise<any> => {
  let raw = req.query.raw ? req.query.raw === "true" : false;
  let forNetwork = req.params.forNetwork.toLocaleLowerCase();
  let tokenName = req.params.tokenName.toLocaleLowerCase();
  let totalSupply = await TokenSupply.findOne({ tokenName });

  if (totalSupply) {
    let supplyResponse = prepareSupplyResponse(totalSupply, forNetwork, raw, req.params.requestType);

    if (supplyResponse) {
      return res.send(supplyResponse);
    }
    return res.status(httpStatus.NOT_FOUND).send({ message: `${req.params.tokenName} supply not avaible for ${req.params.forNetwork}` });
  }
  return res.status(httpStatus.NOT_FOUND).send({ message: `${req.params.tokenName} token configuration not found in config.ts` });
});

export default {
  getTotalTokenSupply,
};
