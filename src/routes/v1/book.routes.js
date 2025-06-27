import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/requireRole.middleware.js";
import { createBook } from "../../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.post('/', requireAuth, requireRole('admin'), createBook);
// bookRouter.get('/', listBooks); // public
// bookRouter.get('/:id', getBookById); // public
// bookRouter.put('/:id', requireAuth, requireRole('admin'), updateBook);
// bookRouter.delete('/:id', requireAuth, requireRole('admin'), deleteBook);

export default bookRouter;