import { gql } from "apollo-server";

export default gql`
  type Npc {
    _id: ID
    name: String!
    description: String
    details: String
    avatar: String
    creator: User!
    campaign: Campaign!
    organizations: [Organization!]!
    locations: [Location!]!
  }

  input NpcInput {
    name: String!
    description: String
    details: String
    campaign: String!
    avatar: String
    organizations: [ID!]!
    locations: [ID!]!
  }

  input UpdateNpcInput {
    _id: ID!
    name: String!
    description: String
    avatar: Upload
  }

  input SingleNpcInput {
    _id: ID!
  }

  input CampaignNpcInput {
    campaign: String
    location: String
  }

  extend type Query {
    npcs(input: CampaignNpcInput): [Npc!]!
    npc(input: SingleNpcInput): Npc!
  }

  extend type Mutation {
    createNpc(input: NpcInput): Npc!
    updateNpc(input: UpdateNpcInput): Npc!
    deleteNpc(input: SingleNpcInput): Npc!
  }
`;
