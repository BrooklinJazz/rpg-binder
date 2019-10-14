import { model, Schema } from "mongoose";
import { IUser } from "./types";
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  campaigns: [
    {
      // not autopopulating for now
      type: Schema.Types.ObjectId,
      ref: "Campaign"
    }
  ]
});

export default model<IUser>("User", userSchema);
