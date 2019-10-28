import { model, Schema } from "mongoose";
import { IPageDocument } from "./types";

const pageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  relatedPages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Page",
    }
  ],
  parentSection: {
    type: Schema.Types.ObjectId,
    ref: "Section",
  },
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

export default model<IPageDocument>("Page", pageSchema);
