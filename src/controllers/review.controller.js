import { Book } from '../models/book.model.js';
import { Review } from '../models/review.model';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler.js';

export const addReviewToBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  if (!rating || !review) {
    throw new ApiError(400, 'Rating and review are required');
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  const existingReview = await Review.findOne({
    user: req.user._id,
    book: bookId,
  });

  if (existingReview) {
    throw new ApiError(400, 'You have already reviewed this book');
  }

  const newReview = await Review.create({
    user: req.user._id,
    book: bookId,
    rating,
    review,
  });

  // Update book stats
  const reviews = await Review.find({ book: bookId });

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  book.rating = avgRating;
  book.numReviews = reviews.length;
  await book.save();

  return new ApiResponse(201, newReview, 'Review added successfully').send(res);
});

export const getBookReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  const reviews = await Review.find({ book: bookId })
    .populate('user', 'fullName avatar')
    .sort({ createdAt: -1 });

  return new ApiResponse(200, reviews, 'Reviews fetched successfully').send(
    res
  );
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  if (review.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this review');
  }

  await review.deleteOne();

  const reviews = await Review.find({ book: review.book });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  await Book.findByIdAndUpdate(review.book, {
    rating: avgRating,
    numReviews: reviews.length,
  });

  return new ApiResponse(200, null, 'Review deleted successfully').send(res);
});
