import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/requireRole.middleware.js";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../../controllers/book.controller.js";
import { verifyApiKey } from "../../middlewares/verifyApiKey.middleware.js";
import { addReviewToBook, getBookReviews } from "../../controllers/review.controller.js";

const bookRouter = express.Router();

bookRouter.use(verifyApiKey)

bookRouter.post('/', requireAuth, requireRole('admin'), createBook);
bookRouter.get('/', getAllBooks); // public
bookRouter.get('/:id', getBookById); // public
bookRouter.put('/:id', requireAuth, requireRole('admin'), updateBook);
bookRouter.delete('/:id', requireAuth, requireRole('admin'), deleteBook);
bookRouter.post('/:bookId/reviews', requireAuth, addReviewToBook); 
bookRouter.get('/:bookId/reviews', requireAuth, getBookReviews); 

export default bookRouter;