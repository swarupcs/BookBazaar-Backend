import { Book } from "../models/book.model.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";



export const placeOrder = asyncHandler(async (req, res) => {

    const { items } = req.body;

    if( !items || !Array.isArray(items) || items.length === 0 ) {
        throw new ApiError(400, 'No items in order');
    }

    let totalAmount = 0;

    for (const item of items) {
        const book = await Book.findById(item.book);
        // console.log("book", book);
        if (!book) {
            throw new ApiError(404, "Book not found");
        }

        if (book.stock < item.quantity) {
            throw new ApiError(400, `Insufficient stock for book: ${book.title}`);
        }

        totalAmount += item.quantity * book.price;
        // console.log("totalAmount", totalAmount);
    }

    // Decrease stock

    for(const item of items ) {
        await Book.findByIdAndUpdate(item.book, {
            $inc: { stock: -item.quantity},
        })
    }

    console.log("req.user", req.user);

    const order = await Order.create({
        user: req.user._id,
        items,
        totalAmount,
        status: 'placed',
    })

    return new ApiResponse(201, order, 'Order placed successfully').send(res);
})

export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id}).populate('items.book', 'title price')
        .sort({ createdAt: -1 });

    return new ApiResponse(200, orders, 'User orders retrieved successfully').send(res);
})


export const getOrderById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if(!id) {
        throw new ApiError(400, 'Order ID is required');
    }

    const order = await Order.findById(id).populate('items.book', 'title price');

    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    if(order.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You do not have permission to view this order');
    }

    return new ApiResponse(200, order, 'Order details retrieved successfully').send(res);
})