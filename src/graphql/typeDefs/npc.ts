import { gql } from "apollo-server";

export default gql`
  type Npc {
    _id: ID
    name: String!
    description: String
    creator: User!
    campaign: Campaign
  }

  input NpcInput {
    name: String!
    description: String
    campaign: String
  }

  input CampaignNpcInput {
    campaign: String
  }

  extend type Query {
    npcs(input: CampaignNpcInput): [Npc!]!
  }

  extend type Mutation {
    createNpc(input: NpcInput): Npc!
  }
`;
