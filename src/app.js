import express from "express";
import cookieParser from 'cookie-parser';


import { PORT } from "./config/serverConfig.js";
import { connectDB } from './db/index.js';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => {
    console.error('Mongodb connection error', err);
    process.exit(1);
  });