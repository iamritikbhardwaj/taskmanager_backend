import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // if referencing a User document
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Optional virtual `id` field
taskSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
