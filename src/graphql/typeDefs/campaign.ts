import { gql } from "apollo-server";

export default gql`
  type Campaign {
    _id: ID!
    name: String!
    description: String
    npcs: [Npc!]!
    organizations: [Organization!]!
    locations: [Location!]!
    creator: User!
  }

  input CampaignInput {
    name: String!
    description: String
  }

  input UpdateCampaignInput {
    _id: ID!
    name: String!
    description: String
  }

  input SingleCampaignInput {
    _id: ID!
  }

  extend type Query {
    campaigns: [Campaign!]!
    campaign(input: SingleCampaignInput): Campaign!
  }

  extend type Mutation {
    createCampaign(input: CampaignInput): Campaign!
    updateCampaign(input: UpdateCampaignInput): Campaign!
    deleteCampaign(input: SingleCampaignInput): Campaign!
  }
`;
