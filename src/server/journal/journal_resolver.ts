import { checkSignedIn, userIdFromContext } from "../../graphql/resolvers/helpers";
import JournalFacade from "./journal_facade";

export default {
  Query: {
    sections: async (
      root: any,
      { input }: IInput<{ campaign?: string; location?: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      return JournalFacade.findSections(input, context);
    }
  },
  Mutation: {
    // TODO determine req type
    createSection: async (
      root: any,
      { input }: IInput<ILocationInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
    }
  }
};
