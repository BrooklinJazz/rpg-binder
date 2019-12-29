import { model, Schema } from "mongoose";
import { ISectionDocument } from "../types";

const sectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Page"
    }
  ],
  parentSection: {
    type: Schema.Types.ObjectId,
    ref: "Section"
  },
  index: Number,
  creator: {
    type: String,
    required: true
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  }
});

const SectionModel = model<ISectionDocument>("Section", sectionSchema);

export default SectionModel;
