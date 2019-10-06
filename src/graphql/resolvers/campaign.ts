import Campaign from "../../models/campaign";
import {
  ICampaign,
  ICampaignInput,
  IContext,
  IInput,
  IUpdateCampaignInput
} from "../../models/types";
import User from "../../models/user";
import { checkSignedIn, npcsFromIds, userFromId } from "./helpers";

export default {
  Query: {
    campaigns: async (root: any, input: null, context: IContext) => {
      checkSignedIn(context);
      try {
        const campaigns = await Campaign.find().lean();
        const transformedNpcs = campaigns.map((campaign: ICampaign) => ({
          ...campaign,
          creator: userFromId(campaign.creator),
          npcs: npcsFromIds(campaign.npcs)
        }));
        return transformedNpcs;
      } catch (error) {
        throw error;
      }
    },
    campaign: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const campaign = await Campaign.findById(input._id).lean();
        if (!campaign) {
          throw Error("Campaign not found");
        }
        const transformedCampaign = {
          ...campaign,
          creator: userFromId(campaign.creator),
          npcs: npcsFromIds(campaign.npcs)
        };
        return transformedCampaign;
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
        npcs: []
      });
      try {
        const createdCampaign = await campaign.save();
        const dbUser = await User.findById(userId);
        if (!dbUser) {
          throw new Error("User Does Not Exist");
        }
        dbUser.campaigns.push(createdCampaign);
        dbUser.save();
        return {
          ...createdCampaign.toObject(),
          npcs: [],
          creator: userFromId(createdCampaign.creator)
        };
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
        dbUser.campaigns.push(updatedCampaign._id);
        dbUser.save();
        return {
          ...updatedCampaign.toObject(),
          npcs: npcsFromIds(updatedCampaign.npcs),
          creator: userFromId(updatedCampaign.creator)
        };
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
        const dbUser = await User.findById(userId);
        if (!dbUser) {
          throw new Error("User Does Not Exist");
        }
        if (!deletedCampaign) {
          throw new Error("Campaign Does Not Exist");
        }
        return {
          ...deletedCampaign.toObject(),
          npcs: npcsFromIds(deletedCampaign.npcs),
          creator: userFromId(deletedCampaign.creator)
        };
      } catch (error) {
        throw error;
      }
    }
  }
};
