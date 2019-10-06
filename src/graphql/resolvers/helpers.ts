import jwt from "jsonwebtoken";

import Campaign from "../../models/campaign";
import Npc from "../../models/npc";
import { ICampaign, IContext, INpc, IUser } from "../../models/types";
import User from "../../models/user";

export const npcsFromIds = (npcIds: string[]): any =>
  Npc.find({ _id: { $in: npcIds } })
    .lean()
    .then((npcs: INpc[]) =>
      npcs.map(npc => ({
        ...npc,
        creator: userFromId(npc.creator),
        campaign: campaignFromId(npc.campaign)
      }))
    );

export const userFromId = (userId: string) =>
  User.findById(userId)
    .then(
      (user) =>
        user && {
          ...user.toObject(),
          npcs: npcsFromIds(user.npcs),
          campaigns: campaignsFromIds(user.campaigns)
        }
    )
    .catch(err => {
      throw err;
    });

export const campaignFromId = (campaignId: string) =>
  Campaign.findById(campaignId)
    .lean()
    .then(
      (campaign: ICampaign) =>
        campaign && {
          ...campaign,
          npcs: npcsFromIds(campaign.npcs),
          creator: userFromId(campaign.creator)
        }
    )
    .catch(err => {
      throw err;
    });

export const campaignsFromIds = (campaignIds: string[]): Promise<ICampaign[]> =>
  Campaign.find({ _id: { $in: campaignIds } })
    .lean()
    .then(
      (campaigns: ICampaign[]) =>
        (campaigns.map(campaign => ({
          ...campaign,
          npcs: npcsFromIds(campaign.npcs),
          creator: userFromId(campaign.creator)
        })) as unknown) as ICampaign[]
    )
    .catch(err => {
      throw err;
    });

export const checkSignedIn = (context: IContext) => {
  if (!context.user) {
    throw new Error("User is not authenticated");
  }
};

export const authTokenFromUser = (user: IUser) =>
  jwt.sign(
    { userId: user.id, email: user.email },
    // NOTE using an empty string when undefined to avoid a type issue.
    process.env.JWT_SECRET_KEY || "",
    { expiresIn: "1h" }
  );

export const userIdFromContext = (context: IContext): string => {
  if ("user" in context && "id" in context!.user!) {
    return context.user!._id;
  } else {
    throw new Error("user id not in passed context userIdFromContext");
  }
};
