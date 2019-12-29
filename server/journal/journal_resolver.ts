import { IContext, IInput, IPageInput, ISectionInput } from "../types";
import JournalFacade from "./journal_facade";
import PageObject from "./page_object";
import SectionObject from "./section_object";

export default {
  Query: {
    sections: async (
      root: any,
      { input }: IInput<{ campaign: string }>,
      context: IContext
    ): Promise<SectionObject[]> =>
      new JournalFacade({
        user: context.userId,
        campaign: input.campaign
      }).getSections(),
    pages: async (
      root: any,
      { input }: IInput<{ campaign: string; section: string }>,
      context: IContext
    ): Promise<PageObject[]> =>
      new JournalFacade({
        user: context.userId,
        campaign: input.campaign
      }).getPages(input.section),
    page: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ): Promise<PageObject> =>
      new JournalFacade({
        user: context.userId,
        campaign: ""
      }).getPage(input._id)
  },
  Mutation: {
    deleteSection: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ): Promise<any> =>
      new JournalFacade({
        user: context.userId,
        campaign: ""
      }).deleteSection(input),
    deletePage: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ): Promise<any> =>
      new JournalFacade({
        user: context.userId,
        campaign: ""
      }).deletePage(input),
    updateOrCreateSection: async (
      root: any,
      { input }: IInput<ISectionInput>,
      context: IContext
    ): Promise<SectionObject> =>
      new JournalFacade({
        user: context.userId,
        campaign: input.campaign
      }).updateOrCreateSection(input),
    updateOrCreatePage: async (
      root: any,
      { input }: IInput<IPageInput>,
      context: IContext
    ): Promise<PageObject> =>
      new JournalFacade({
        user: context.userId,
        campaign: input.campaign
      }).updateOrCreatePage(input),
    reorderSections: async (
      root: any,
      {
        input
      }: IInput<{ startIndex: number; endIndex: number; campaign: string }>,
      context: IContext
    ) =>
      new JournalFacade({
        user: context.userId,
        campaign: input.campaign
      }).reorderSections(input.startIndex, input.endIndex)
  }
};
