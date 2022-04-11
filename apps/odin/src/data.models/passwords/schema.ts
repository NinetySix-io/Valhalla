import mongoose from 'mongoose';

export const UserPasswordSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    value: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
