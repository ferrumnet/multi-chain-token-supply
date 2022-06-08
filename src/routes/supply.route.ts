import express from "express";
import supplyController from "../controllers/supply.controller";

const router = express.Router();
router.get("/FRM/networks/all", supplyController.getTokenSupply);

export default router;
