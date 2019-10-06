import { model, Schema } from "mongoose";
import { INpc } from "./types";

const npcSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true
  },
  campaign: {
    // not autopopulating this for now as it should never be requested
    // and should only be used for filtering
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  }
});

export default model<INpc>("Npc", npcSchema);
