import mongoose, { Schema } from 'mongoose';


const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    author: {
        type: String,
        required: true,
        trim: true,
    },

    genre: {
        type:[String],
        required: true,
        trim: true,
        index: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    stock: {
        type: Number,
        required: true,
        default: 0,
    },

    coverImage: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: `https://via.placeholder.com/200x300.png`,
            localPath: '',
        },
    },

    rating: {
        type: Number,
        default: 0,
    },

    numReviews: {
        type: Number,
        default: 0,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    stock: {
        type: Number,
        required: true,
        default: 0,
    },
}, {timestamps: true});


export const Book = mongoose.model("Book", bookSchema);