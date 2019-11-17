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
    ): Promise<ICampaign[]> => new CampaignFacade(context.user).getCampaigns(),
    campaign: async (
      root: any,
      { input }: IInput<{_id: string}>,
      context: IContext
    ): Promise<ICampaign> => new CampaignFacade(context.user).getCampaign(input._id)
  },
  Mutation: {
    createCampaign: async (
      root: any,
      { input }: IInput<ICampaignInput>,
      context: IContext
    ): Promise<ICampaign> => new CampaignFacade(context.user).create(input)
    // TODO add update and delete
  }
};
