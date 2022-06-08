import express from "express";
import supplyRoute from "./supply.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/tokenSupply",
    route: supplyRoute,
  },
];

defaultRoutes.forEach((route: any) => {
  router.use(route.path, route.route);
});

export default router;
