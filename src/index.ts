import express, { Application } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes'
import httpStatus from 'http-status'
dotenv.config({ path: path.join(__dirname, '../.env') });

const app: Application = express();
app.use('/v1',router)

app.use((req, res, next) => {
  console.log(httpStatus.NOT_FOUND);
});
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`)
  console.log('Node with Typescript!');
});
