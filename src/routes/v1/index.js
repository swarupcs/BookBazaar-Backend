import express from 'express';
import authRouter from './auth.routes.js';
import bookRouter from './book.routes.js';


const v1Router = express.Router();


v1Router.use("/auth", authRouter);
v1Router.use("/books", bookRouter);

export default v1Router;