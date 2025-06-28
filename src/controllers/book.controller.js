import { Book } from '../models/book.model.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';

export const createBook = asyncHandler(async (req, res) => {
  const { title, author, genre, description, price, stock, coverImage } =
    req.body;

  if (!title || !author || !genre || !description || !price || !stock) {
    throw new ApiError(400, 'All fields are required');
  }

  const book = await Book.create({
    title,
    author,
    genre,
    description,
    price,
    stock,
    coverImage: coverImage || {
      url: `https://via.placeholder.com/200x300.png`,
      localPath: '',
    },
    createdBy: req.user._id,
  });

  return new ApiResponse(201, book, 'Book created successfully').send(res);
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const {
    search = '',
    genre,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  // Add search filter if search is present
  const isSearch = search.trim().length > 0;

  // Search filter (title or author)
  if (isSearch) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
    ];
  }

  // Genre filter
  if (genre) {
    query.genre = genre;
  }

  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  let books, total;

  if (isSearch) {
    const skip = (page - 1) * limit;
    [books, total] = await Promise.all([
      Book.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
      Book.countDocuments(query),
    ]);
  } else {
    books = await Book.find(query).sort(sortOptions);
    total = books.length;
  }

  return new ApiResponse(
    200,
    {
      total,
      page: Number(page),
      limit: Number(limit),
      books,
    },
    'Books fetched successfully'
  ).send(res);
});

export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id).populate(
    'createdBy',
    'username fullName email'
  );

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  return new ApiResponse(200, book, 'Book fetched successfully').send(res);
});
