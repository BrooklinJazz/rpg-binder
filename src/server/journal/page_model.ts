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
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  }
});

const PageModel = model<IPageDocument>("Page", pageSchema);

export default PageModel;
