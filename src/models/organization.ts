import { model, Schema } from "mongoose";
import { IOrganization } from "./types";
const organizationSchema = new Schema({
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
  },
  campaign: {
    // not autopopulating this for now as it should never be requested
    // and should only be used for filtering
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

organizationSchema.plugin(require('mongoose-autopopulate'))

export default model<IOrganization>("Organization", organizationSchema);
