import { gql } from "apollo-server";

export default gql`
  type Section {
    _id: ID!
    name: String!
    pages: [Page!]!
    creator: String!
    campaign: Campaign!
    parentSection: ID
    sections: [Section!]!
  }

  type Page {
    _id: ID!
    name: String!
    description: String
    relatedPages: [Page!]!
    section: Section
    creator: String!
    campaign: Campaign!
    isPinned: Boolean
  }

  input SectionsInput {
    campaign: ID!
  }

  input PagesInput {
    campaign: ID!
    section: ID!
  }

  extend type Query {
    sections(input: SectionsInput): [Section!]!
    page(input: SingleID): Page!
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
    parentSection: ID
  }

  extend type Mutation {
    updateOrCreateSection(input: SectionInput): Section!
    updateOrCreatePage(input: PageInput): Page!
    deleteSection(input: SingleID): ID
    deletePage(input: SingleID): ID
  }
`;
