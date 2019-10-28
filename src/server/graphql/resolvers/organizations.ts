import { IContext, IInput, IOrganizationInput } from "../../models/types";
import User from "../../models/user";
import Organization from "../../models/organization";
import { checkSignedIn, userIdFromContext } from "./helpers";

export default {
  Query: {
    organizations: async (
      root: any,
      { input }: IInput<{ campaign?: string; location?: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      try {
        const organizations = await Organization.find({
          ...input,
          creator: userId
        });
        return organizations;
      } catch (error) {
        throw error;
      }
    },
    organization: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const organization = await Organization.findById(input._id);
        if (!organization) {
          throw Error("Organization not found");
        }
        return organization;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    // TODO determine req type
    createOrganization: async (
      root: any,
      { input }: IInput<IOrganizationInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      const organization = new Organization({
        ...input,
        npcs: [],
        creator: userId
      });
      try {
        const createdOrganization = await organization.save();
        const dbUser = await User.findById(userId);
        if (!dbUser) {
          throw new Error("User Does Not Exist");
        }
        // dbUser.organizations.push(createdOrganization);
        dbUser.save();
        return createdOrganization.toObject();
      } catch (error) {
        throw error;
      }
    }
  }
};
