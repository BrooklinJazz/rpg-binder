import { model, Schema } from "mongoose";
import { ICampaign } from "./types";
const campaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  npcs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Npc"
    }
  ],
  organizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization"
    }
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location"
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

campaignSchema.plugin(require("mongoose-autopopulate"));

export default model<ICampaign>("Campaign", campaignSchema);
