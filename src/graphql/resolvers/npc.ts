import Npc from "../../models/npc";
import { IContext, IInput, INpcInput } from "../../models/types";
import User from "../../models/user";
import {
  checkSignedIn,
  userIdFromContext
} from "./helpers";

export default {
  Query: {
    npcs: async (
      root: any,
      { input }: IInput<{ campaign?: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      const filters = {
        creator: userId,
        campaign: input && input.campaign
      };
      try {
        const npcs = await Npc.find({
          // using spread removes undefined filters from the expression
          ...filters
        }).lean();
        return npcs;
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
        const dbUser = await User.findById(userId);
        if (!dbUser) {
          throw new Error("User Does Not Exist");
        }
        dbUser.npcs.push(createdNpc);
        dbUser.save();
        return createdNpc.toObject();
      } catch (error) {
        throw error;
      }
    }
  }
};
