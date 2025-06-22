import { User } from '../models/user.model.js';
import {
  issueTokensForUser,
  registerUser,
  validateCredentials,
} from '../services/auth.services.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { setAuthCookies } from '../utils/cookies.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const register = asyncHandler(async (req, res) => {
    const {fullName, email, username, password} = req.body;

    if(!fullName || !email || !username || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({
        $or: [{email}, {username}],
    });

    if(existingUser) {
        throw new ApiError(400, 'User with this email or username already exists');
    }

    const user = await registerUser({ fullName, email, username, password });

    const accessToken = generateAccessToken({
        _id: user._id,
        email: user.email,
        role: user.role,
    })

    const refreshToken = generateRefreshToken({ _id: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    return new ApiResponse(201, {
        user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
        }
    }, 'User registered successfully').send(res);

});

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await validateCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = await issueTokensForUser(user);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: 'Login successfull', data: { user, accessToken } });
  } catch (error) {
    console.log('error in login controller:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
