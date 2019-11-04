import {
  IInput,
  IUserInput,
  IAuthData,
  IContext,
  ICampaign,
  ICampaignInput,
  ICreateSectionInput,
  IPage,
  ICreatePageInput
} from "../types";
import JournalFacade from "./journal_facade";
import { checkSignedIn } from "../helpers";
import SectionObject from "./section_object";
import PageObject from "./page_object";

export default {
  Query: {
    sections: async (
      root: any,
      { input }: IInput<{ campaign: string }>,
      context: IContext
    ): Promise<SectionObject[]> =>
      new JournalFacade({
        user: context.user,
        campaign: input.campaign
      }).getSections()
  },
  Mutation: {
    createSection: async (
      root: any,
      { input }: IInput<ICreateSectionInput>,
      context: IContext
    ): Promise<SectionObject> =>
      new JournalFacade({
        user: context.user,
        campaign: input.campaign
      }).createSection(input),
    createPage: async (
      root: any,
      { input }: IInput<ICreatePageInput>,
      context: IContext
    ): Promise<PageObject> =>
      new JournalFacade({
        user: context.user,
        campaign: input.campaign
      }).createPage(input)
  }
};
