import { IContext, IInput, ISessionItem } from "../types";
import SessionFacade from "./session_facade";

export default {
  Query: {
    session: async (
      root: any,
      { input }: IInput<{ campaign: string }>,
      context: IContext
    ): Promise<ISessionItem[]> =>
      new SessionFacade({
        user: context.userId,
        campaign: input.campaign
      }).getSessionItems()
  },
  Mutation: {
    addSessionItem: async (
      root: any,
      { input }: IInput<{ page: string }>,
      context: IContext
    ): Promise<any> =>
      new SessionFacade({
        user: context.userId,
        campaign: ""
      }).addPage(input.page),
    removeSessionItem: async (
      root: any,
      { input }: IInput<{ page: string }>,
      context: IContext
    ): Promise<any> =>
      new SessionFacade({
        user: context.userId,
        campaign: ""
      }).removePage(input.page)
  }
};
