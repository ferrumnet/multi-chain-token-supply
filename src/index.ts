import express, { Application } from "express";
import config from "../config";
import router from "./routes";
import httpStatus from "http-status";

const app: Application = express();
app.use("/v1", router);

app.use((req, res, next) => {
  return res.json(httpStatus.NOT_FOUND);
});
app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
  console.log("Node with Typescript!");
});
