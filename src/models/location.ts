import { model, Schema } from "mongoose";
import { ILocation } from "./types";
const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  npcs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Npc",
      autopopulate: true
    }
  ],
  organizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      autopopulate: true
    }
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
      autopopulate: true
    }
  ],
  parentLocation: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    autopopulate: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
    required: true
  },
  campaign: {
    // not autopopulating this for now as it should never be requested
    // and should only be used for filtering
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  }
});

locationSchema.plugin(require("mongoose-autopopulate"));

export default model<ILocation>("Location", locationSchema);
