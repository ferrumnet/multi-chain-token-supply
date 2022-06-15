import express from "express";
import supplyController from "../controllers/supply.controller";

const router = express.Router();
router.get("/:tokenName/networks/:forNetwork", supplyController.getTokenSupply);

export default router;
