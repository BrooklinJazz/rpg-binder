import { model, Schema } from "mongoose";
import { INpc } from "./types";

const statBlockSchema = new Schema({
  HIT_POINTS: Number
});

const npcSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  details: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true
  },
  statblock: statBlockSchema,
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
  campaign: {
    // not autopopulating this for now as it should never be requested
    // and should only be used for filtering
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  }
});

// npcSchema.plugin(require("mongoose-autopopulate"));

export default model<INpc>("Npc", npcSchema);
