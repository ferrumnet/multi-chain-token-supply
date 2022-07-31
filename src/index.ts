import express, { Application } from "express";
import config from "../config";
import router from "./routes";
import httpStatus from "http-status";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fetchTokenSupplies } from "./utils/crons/fetchTokenSupplies.cron";
dotenv.config();

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  });

const app: Application = express();
app.use("/v1", router);

app.use((req, res, next) => {
  return res.json(httpStatus.NOT_FOUND);
});

fetchTokenSupplies();

const server = app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
  console.log("Node with Typescript!");
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
