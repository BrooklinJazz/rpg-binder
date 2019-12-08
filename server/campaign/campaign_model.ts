import { model, Schema } from "mongoose";
import { ICampaignDocument } from "../types";
import { string } from "prop-types";
const campaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization"
    }
  ],
  creator: {
    type: String,
    required: true
  }
});

const CampaignModel = model<ICampaignDocument>("Campaign", campaignSchema);

export default CampaignModel;
