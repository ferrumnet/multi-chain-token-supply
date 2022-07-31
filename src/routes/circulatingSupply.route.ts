import express from "express";
import supplyController from "../controllers/supply.controller";
import paramsExtenderMiddleware from "../middlewares/paramsExtender.middleware";
const router = express.Router();
router.get("/:tokenName/networks/:forNetwork", paramsExtenderMiddleware({ requestType: "circulatingSupply" }), supplyController.getTotalTokenSupply);

export default router;
