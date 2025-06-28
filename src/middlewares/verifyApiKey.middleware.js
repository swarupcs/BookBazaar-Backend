import { ApiKey } from "../models/apiKey.model.js";
import { ApiError } from "../utils/api-error.js";



export const verifyApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apiKey) {
        throw new ApiError(401, 'API key is required');
    }
    

    const existingKey = await ApiKey.findOne({ key: apiKey, isActive: true });

    if(!existingKey) {
        throw new ApiError(401, 'Invalid or inactive API key');
    }

    // Attach the user associated with the API key to the request object
    req.apiKeyUser = existingKey.user;

    next();
}