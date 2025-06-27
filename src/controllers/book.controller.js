import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createBook = asyncHandler(async (req, res) => {

    const {title, author, genre, description, price, stock, coverImage} = req.body;

    if(!title || !author || !genre || !description || !price || !stock ) {
        throw new ApiError(400, "All fields are required");
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
    })

    return new ApiResponse(201, book, "Book created successfully").send(res);

})