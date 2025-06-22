import jwt from 'jsonwebtoken'; 

import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY} from '../config/serverConfig.js';


export const generateAccessToken = (user) => {
    return jwt.sign({_id: user._id, email: user.email, role: user.role}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRY});
};

export const generateRefreshToken = (user) => {
    return jwt.sign({_id: user._id, email: user.email, role: user.role}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRY});
}

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new Error('Invalid access token');
    }
}

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};