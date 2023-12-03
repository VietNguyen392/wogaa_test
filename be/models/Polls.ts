import { timeStamp } from "console";
import mongoose from "mongoose";
import { IPoll } from "../utils";

const pollSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "Users" },
    title: { type: String, require: true, trim: true },
    options: [
      {
        name: { type: String, require: true },
        count: { type: Number, default: 0 },
      },
    ],
    user_voted: [{ type: String }],
  },
  { timestamps: true }
);
pollSchema
  .path("options")
  .validate((v) => v.length > 1, "Must have at least 2 options");
pollSchema.path("options").validate((v) => v.length < 6, "Limit by 5 options");
export default mongoose.model<IPoll>("Poll", pollSchema);
