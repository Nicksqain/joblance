import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const orderSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 10,
      max: 32,
      required: true,
    },
    views: {
      type: Number,
    },
    postedBy: {
      type: ObjectId,
      required: true,

      ref: "User",
    },
    description: {
      type: String,
      trim: true,
      required: true,
      min: 70,
      max: 150,
    },
    orderServicePlace: {
      type: String,
      required: true,
      trim: true,
      max: 25,
    },
    budget: {
      type: Number,
      required: true,
      trim: true,
      min: 2500,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
