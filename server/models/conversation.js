import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const messageSchema = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    lastmessage: {
      type: String,
      default: null,
      ref: "Message",
    },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model("Conversation", messageSchema);
