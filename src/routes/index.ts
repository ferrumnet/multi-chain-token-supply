import express from "express";
import supplyRoute from "./supply.route";
import totalSupplyRoute from "./totalSupply.route";
import nonCirculatingSupply from "./nonCirculatingSupply.route";
import circulatingSupply from "./circulatingSupply.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/tokenSupply",
    route: supplyRoute,
  },
  {
    path: "/tokenTotalSupply",
    route: totalSupplyRoute,
  },
  {
    path: "/tokenNonCirculatingSupply",
    route: nonCirculatingSupply,
  },
  {
    path: "/tokenCirculatingSupply",
    route: circulatingSupply,
  },
];

defaultRoutes.forEach((route: any) => {
  router.use(route.path, route.route);
});

export default router;
