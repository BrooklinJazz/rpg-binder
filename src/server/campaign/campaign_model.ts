import { model, Schema } from "mongoose";
import { ICampaignDocument } from "../types";
const campaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization"
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const CampaignModel = model<ICampaignDocument>("Campaign", campaignSchema);

export default CampaignModel
