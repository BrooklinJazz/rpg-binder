import { gql } from "apollo-server";

export default gql`
  type Section {
    _id: ID!
    name: String!
    pages: [Page!]!
    creator: User!
    campaign: Campaign!
  }

  type Page {
    _id: ID!
    name: String!
    relatedPages: [Page!]!
    section: Section
    creator: User!
    campaign: Campaign!
  }

  input SectionsInput {
    campaign: ID!
  }

  input PageInput {
    _id: ID!
  }

  extend type Query {
    sections(input: SectionsInput): [Section!]!
    page(input: PageInput): Page!
  }

  # Mutation Inputs

  input CreatePageInput {
    name: String!
    relatedPages: [ID!]!
    section: ID!
    campaign: ID!
  }

  input CreateSectionInput {
    campaign: ID!
    name: String!
  }

  extend type Mutation {
    createSection(input: CreateSectionInput): Section!
    createPage(input: CreatePageInput): Page!
  }
`;
