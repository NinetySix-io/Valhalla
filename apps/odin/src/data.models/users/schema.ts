import mongoose from 'mongoose';

export const ProviderSchema = new mongoose.Schema({
  providerId: String,
  name: String,
});

export const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    password: String,
    email: { type: String, lowercase: true },
    displayName: String,
    provider: String,
    providers: [ProviderSchema],
    roles: [String],
    picture: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    linkedin: String,
    live: String,
    twitter: String,
  },
  {
    timestamps: true,
  },
);
