import { model, Schema } from "mongoose";
import { ISectionDocument } from "./types";

const sectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Page",
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  }
});

export default model<ISectionDocument>("Section", sectionSchema);
