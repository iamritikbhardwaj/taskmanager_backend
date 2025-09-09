import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false // ⛔ Exclude password from query results by default
  }  
}, {
  timestamps: true,               // ⏱ Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add a virtual "id" field (mirrors _id)
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
