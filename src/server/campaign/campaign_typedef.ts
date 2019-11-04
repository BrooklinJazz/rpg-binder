import { gql } from "apollo-server";

export default gql`

  type Campaign {
    _id: ID!
    name: String!
    # sections: [Section!]!
    creator: User!
  }

  input CampaignInput {
    name: String!
  }

  input UpdateCampaignInput {
    _id: ID!
    name: String!
  }

  input SingleCampaignInput {
    _id: ID!
  }

  extend type Query {
    campaigns: [Campaign!]!
  }

  extend type Mutation {
    createCampaign(input: CampaignInput): Campaign!
    updateCampaign(input: UpdateCampaignInput): Campaign!
    deleteCampaign(input: SingleCampaignInput): Campaign!
  }
`;
