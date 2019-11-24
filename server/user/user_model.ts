import { model, Schema } from "mongoose";
import { IUserDocument } from "../types";
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: String,
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Section"
    }
  ],
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Campaign"
    }
  ]
});

const UserModel = model<IUserDocument>("User", userSchema);

export default UserModel;
