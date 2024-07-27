import { model, Schema } from "mongoose";

// Define the schema for the "User" model
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: { type: String },
    occupation: { type: String },
    viewedProfile: { type: Number },
    impressions: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Create the "User" model using the schema
const User = model("User", UserSchema);

// Export the "User" model
export default User;
