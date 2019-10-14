import {
  IContext,
  IInput,
  ILocationInput,
  IUpdateLocationInput,
  ILocation
} from "../../models/types";
import Campaign from "../../models/campaign";
import Location from "../../models/location";
import User from "../../models/user";
import { checkSignedIn, userIdFromContext } from "./helpers";

export default {
  Query: {
    locations: async (
      root: any,
      { input }: IInput<{ campaign?: string; parentLocation?: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      try {
        return await Location.find({
          creator: userId,
          ...input
        }).lean();
      } catch (error) {
        throw error;
      }
    },
    location: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const location = await Location.findById(input._id).lean();
        if (!location) {
          throw Error("Location not found");
        }
        return location;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    // TODO determine req type
    createLocation: async (
      root: any,
      { input }: IInput<ILocationInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      const location = new Location({
        ...input,
        creator: userId
      });
      try {
        const createdLocation = await location.save();
        const campaign = await Campaign.findById(input.campaign);
        if (!campaign) {
          throw new Error("Campaign does not exist");
        }
        campaign.locations.push(createdLocation);
        campaign.save();
        const parentLocation = await Location.findById(input.parentLocation);
        if (parentLocation) {
          parentLocation.locations.push();
          parentLocation.save();
        }
        const populatedLocation = Location.findById(createdLocation._id)
        return populatedLocation;
      } catch (error) {
        throw error;
      }
    },
    updateLocation: async (
      root: any,
      { input }: IInput<IUpdateLocationInput>,
      context: IContext
    ) => {
      checkSignedIn(context);
      const userId = userIdFromContext(context);
      const updatedLocation: ILocation | null = await Location.findByIdAndUpdate(
        input._id,
        {
          ...input
        },
        // get the new version of the campaign, not the old one.
        { new: true }
      );
      const campaign = await Campaign.findById(input.campaign);
      if (!campaign) {
        throw new Error("Campaign does not exist");
      }
      if (!updatedLocation) {
        throw new Error("Location Does Not Exist");
      }
      // NOTE do we need this?
      //   campaign.locations.push(updatedLocation._id);
      //   campaign.save();
      //   const parentLocation = await Location.findById(input.parentLocation);
      //   if (parentLocation) {
      //     parentLocation.locations.push();
      //   }
      return updatedLocation.toObject();
    },
    deleteLocation: async (
      root: any,
      { input }: IInput<{ _id: string }>,
      context: IContext
    ) => {
      checkSignedIn(context);
      try {
        const deletedLocation: ILocation | null = await Location.findByIdAndDelete(
          input._id
        );
        if (!deletedLocation) {
          throw new Error("Location Does Not Exist");
        }
        return deletedLocation.toObject();
      } catch (error) {
        throw error;
      }
    }
  }
};
