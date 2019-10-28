import { gql } from "apollo-server";

export default gql`
  type Organization {
    _id: ID
    name: String!
    description: String
    creator: User!
    npcs: [Npc!]!
    campaign: Campaign
  }

  input OrganizationInput {
    name: String!
    description: String
    campaign: String
    npcs: [ID!]!
  }

  input UpdateOrganizationInput {
    _id: ID!
    name: String!
    description: String
    npcs: [ID!]!
  }

  input SingleOrganizationInput {
    _id: ID!
  }

  input Organizations {
    campaign: String
    location: String
  }

  extend type Query {
    organizations(input: Organizations): [Organization!]!
    organization(input: SingleOrganizationInput): Organization!
  }

  extend type Mutation {
    createOrganization(input: OrganizationInput): Organization!
    updateOrganization(input: UpdateOrganizationInput): Organization!
    deleteOrganization(input: SingleOrganizationInput): Organization!
  }
`;
