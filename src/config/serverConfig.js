import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const MONGO_URI = process.env.MONGO_URI;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_access_token_secret';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret';
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '7d';
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '15d';
