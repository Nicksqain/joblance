import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ["freelancer", "orderer"],
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    image: {
      type: String,
      default:
        "https://i.pinimg.com/originals/2f/16/1f/2f161f60c8ca2bdfb02f2bab4a818f82.gif",
      public_id: "",
      url: "",
    },
    resetCode: "",
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
