import Npc from "../../models/npc";
import Organization from "../../models/organization";
import {
  IContext,
  IInput,
  INpcInput,
  IUpdateNpcInput,
  INpc
} from "../../models/types";
import Campaign from "../../models/campaign";
import { checkSignedIn, userIdFromContext } from "./helpers";

export default {
  Query: {
    npcs: async (
      root: any,
      { input }: IInput<{ campaign?: string, location?: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      try {
        return await Npc.find({
          creator: userId,
          ...input
        });
      } catch (error) {
        throw error;
      }
    },
    npc: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const npc = await Npc.findById(input._id);
        if (!npc) {
          throw Error("Npc not found");
        }
        return npc;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    // TODO determine req type
    createNpc: async (
      root: any,
      { input }: IInput<INpcInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      const npc = new Npc({
        ...input,
        creator: userId
      });
      try {
        const createdNpc = await npc.save();
        const campaign = await Campaign.findById(input.campaign);
        if (!campaign) {
          throw new Error("Campaign Does Not Exist");
        }
        // update campaign npcs
        campaign.npcs.push(createdNpc);
        campaign.save();
        // update organization npcs
        if (input.organizations.length > 0) {
          await Organization.updateMany(
            {
              _id: { $in: input.organizations }
            },
            { $push: { npcs: createdNpc } }
          );
        }
        const populatedNpc = await Npc.findById(createdNpc._id);
        return populatedNpc;
      } catch (error) {
        throw error;
      }
    },
    updateNpc: async (
      root: any,
      { input }: IInput<IUpdateNpcInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      const updateNpc: INpc | null = await Npc.findByIdAndUpdate(
        input._id,
        {
          ...input
        },
        // get the new version of the campaign, not the old one.
        { new: true }
      );
      const campaign = await Campaign.findById(input.campaign);
      if (!campaign) {
        throw new Error("Campaign does not exist");
      }
      if (!updateNpc) {
        throw new Error("Npc Does Not Exist");
      }
      return updateNpc.toObject();
    },
    deleteNpc: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const deletedNpc: INpc | null = await Npc.findByIdAndDelete(input._id);
        if (!deletedNpc) {
          throw new Error("Location Does Not Exist");
        }
        return deletedNpc.toObject();
      } catch (error) {
        throw error;
      }
    }
  }
};
