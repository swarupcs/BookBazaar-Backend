import express from 'express';
import authRouter from './auth.routes.js';
import bookRouter from './book.routes.js';
import reviewRouter from './review.routes.js';
import orderRouter from './order.routes.js';


const v1Router = express.Router();


v1Router.use("/auth", authRouter);
v1Router.use("/books", bookRouter);
v1Router.use("/reviews", reviewRouter);
v1Router.use('/orders', orderRouter);

export default v1Router;