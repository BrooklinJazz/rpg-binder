import {
  IInput,
  IUserInput,
  IAuthData,
  IContext,
  ICampaign,
  ICampaignInput
} from "../types";
import CampaignFacade from "./campaign_facade";

export default {
  Query: {
    campaigns: async (
      root: any,
      _: null,
      context: IContext
    ): Promise<ICampaign[]> => new CampaignFacade(context.userId).getCampaigns(),
    campaign: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ): Promise<ICampaign> =>
      new CampaignFacade(context.userId).getCampaign(input._id)
  },
  Mutation: {
    createCampaign: async (
      root: any,
      { input }: IInput<ICampaignInput>,
      context: IContext
    ): Promise<ICampaign> => new CampaignFacade(context.userId).create(input),
    deleteCampaign: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ): Promise<any> => new CampaignFacade(context.userId).delete(input._id)
  }
};
