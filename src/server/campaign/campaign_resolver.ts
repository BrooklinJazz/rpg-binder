import {
  IInput,
  IUserInput,
  IAuthData,
  IContext,
  ICampaign,
  ICampaignInput
} from "../types";
import CampaignFacade from "./campaign_facade";
import { checkSignedIn } from "../helpers";

export default {
  Query: {
    campaigns: async (
      root: any,
      _: null,
      context: IContext
    ): Promise<ICampaign[]> => new CampaignFacade(context.user).getCampaigns()
  },
  Mutation: {
    createCampaign: async (
      root: any,
      { input }: IInput<ICampaignInput>,
      context: IContext
    ): Promise<ICampaign> => new CampaignFacade(context.user).create(input),
    // updateCampaign: async (
    //   root: any,
    //   { input }: IInput<{ _id: string; name: string }>,
    //   context: IContext
    // ): Promise<IAuthData> => new CampaignFacade(context.user).update(input),
    // deleteCampaign: async (
    //   root: any,
    //   { input }: IInput<{ _id: string }>,
    //   context: IContext
    // ): Promise<IAuthData> => new CampaignFacade(context.user).delete(input)
  }
};
