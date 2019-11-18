import {
  IInput,
  IUserInput,
  IAuthData,
  IContext,
  ICampaign,
  ICampaignInput,
  ISectionInput,
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
      }).getSections(),
    pages: async (
      root: any,
      { input }: IInput<{ campaign: string, section: string }>,
      context: IContext
    ): Promise<PageObject[]> =>
      new JournalFacade({
        user: context.user,
        campaign: input.campaign
      }).getPages(input.section)
  },
  Mutation: {
    updateOrCreateSection: async (
      root: any,
      { input }: IInput<ISectionInput>,
      context: IContext
    ): Promise<SectionObject> =>
      new JournalFacade({
        user: context.user,
        campaign: input.campaign
      }).updateOrCreateSection(input),
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
