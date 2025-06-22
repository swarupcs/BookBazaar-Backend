import { ApiError } from "../utils/api-error.js";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from "../config/serverConfig.js";
import { User } from "../models/user.model.js";


export const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if(!token) {
            throw new ApiError(401, 'Unauthorized: No access token provided');
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select('-password -refreshToken');

        if(!user) {
            throw new ApiError(401, 'Invalid token or user not found');
        }

        req.user = user;
        next();


    } catch (error) {
        return next(new ApiError(401, 'Unauthorized or expiry token'));
    }
}