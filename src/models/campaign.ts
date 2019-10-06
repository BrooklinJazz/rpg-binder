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
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default model<ICampaign>("Campaign", campaignSchema);
