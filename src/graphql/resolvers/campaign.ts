import Campaign from "../../models/campaign";
import {
  ICampaign,
  ICampaignInput,
  IContext,
  IInput,
  IUpdateCampaignInput
} from "../../models/types";
import User from "../../models/user";
import { checkSignedIn } from "./helpers";

export default {
  Query: {
    campaigns: async (root: any, input: undefined, context: IContext) => {
      checkSignedIn(context);
      try {
        const campaigns = await Campaign.find({creator: context.user})
        return campaigns;
      } catch (error) {
        throw new Error(error);
      }
    },
    campaign: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const campaign = await Campaign.findById(input._id);
        if (!campaign) {
          throw Error("Campaign not found");
        }
        return campaign;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    // TODO determine req type
    createCampaign: async (
      root: any,
      { input }: IInput<ICampaignInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = context.user!._id;
      const campaign = new Campaign({
        ...input,
        creator: userId,
        npcs: [],
        organizations: [],
        locations: [],
      });
      try {
        const createdCampaign = await campaign.save();
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User Does Not Exist");
        }
        user.campaigns.push(createdCampaign);
        user.save();
        return createdCampaign.toObject()
      } catch (error) {
        throw error;
      }
    },
    updateCampaign: async (
      root: any,
      { input }: IInput<IUpdateCampaignInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = context.user!._id;
      try {
        const updatedCampaign: ICampaign | null = await Campaign.findByIdAndUpdate(
          input._id,
          {
            ...input
          },
          // get the new version of the campaign, not the old one.
          { new: true }
        );
        const dbUser = await User.findById(userId);
        if (!dbUser) {
          throw new Error("User Does Not Exist");
        }
        if (!updatedCampaign) {
          throw new Error("Campaign Does Not Exist");
        }
        // NOTE is this necessary?
        dbUser.campaigns.push(updatedCampaign._id);
        dbUser.save();
        return updatedCampaign.toObject()
      } catch (error) {
        throw error;
      }
    },
    deleteCampaign: async (
      root: any,
      { input }: IInput<IUpdateCampaignInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = context.user!._id;
      try {
        const deletedCampaign: ICampaign | null = await Campaign.findByIdAndDelete(
          input._id
        );
        if (!deletedCampaign) {
          throw new Error("Campaign Does Not Exist");
        }
        // NOTE TODO remove campaign from user?
        return deletedCampaign.toObject()
      } catch (error) {
        throw error;
      }
    }
  }
};
