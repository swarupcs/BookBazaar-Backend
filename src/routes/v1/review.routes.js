import express from 'express';
import { deleteReview } from '../../controllers/review.controller.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { verifyApiKey } from '../../middlewares/verifyApiKey.middleware.js';

const reviewRouter = express.Router();

reviewRouter.use(verifyApiKey);
reviewRouter.delete('/:id', requireAuth, deleteReview);

export default reviewRouter;
