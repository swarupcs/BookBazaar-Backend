import mongoose, { Schema } from 'mongoose';

const apiKeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

export const ApiKey = mongoose.model('ApiKey', apiKeySchema);
