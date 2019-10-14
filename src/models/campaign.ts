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
      ref: "Npc",
      autopopulate: true,
    }
  ],
  organizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      autopopulate: true,
    }
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
      autopopulate: true,
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
    required: true,
  }
});

campaignSchema.plugin(require('mongoose-autopopulate'))

export default model<ICampaign>("Campaign", campaignSchema);
