import { ApiError } from "../utils/api-error.js";

export const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return next(new ApiError(403, 'Access denied'));
  }
  next();
};
