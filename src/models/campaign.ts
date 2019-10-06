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
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
    required: true,
  }
});

campaignSchema.plugin(require('mongoose-autopopulate'))

export default model<ICampaign>("Campaign", campaignSchema);
