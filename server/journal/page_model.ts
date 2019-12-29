import { model, Schema } from "mongoose";
import { IPageDocument } from "../types";

const pageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  relatedPages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Page"
    }
  ],
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section"
  },
  creator: {
    type: String,
    required: true
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  isPinned: {
    type: Schema.Types.Boolean,
    default: false
  }
});

const PageModel = model<IPageDocument>("Page", pageSchema);

export default PageModel;
