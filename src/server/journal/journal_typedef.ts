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
    description: String
    relatedPages: [Page!]!
    section: Section
    creator: User!
    campaign: Campaign!
  }

  input SectionsInput {
    campaign: ID!
  }

  input SinglePageInput {
    _id: ID!
  }

  input PagesInput {
    campaign: ID!
    section: ID!
  }

  extend type Query {
    sections(input: SectionsInput): [Section!]!
    page(input: SinglePageInput): Page!
    pages(input: PagesInput): [Page!]!
  }

  # Mutation Inputs

  input PageInput {
    _id: ID
    name: String!
    description: String
    relatedPages: [ID!]!
    section: ID!
    campaign: ID!
  }

  input SectionInput {
    _id: ID
    campaign: ID!
    name: String!
  }

  extend type Mutation {
    updateOrCreateSection(input: SectionInput): Section!
    updateOrCreatePage(input: PageInput): Page!
  }
`;
