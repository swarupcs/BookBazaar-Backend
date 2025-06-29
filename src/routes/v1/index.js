import express from 'express';
import authRouter from './auth.routes.js';
import bookRouter from './book.routes.js';
import reviewRouter from './review.routes.js';


const v1Router = express.Router();


v1Router.use("/auth", authRouter);
v1Router.use("/books", bookRouter);
v1Router.use("/reviews", reviewRouter);

export default v1Router;