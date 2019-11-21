import { gql } from "apollo-server";

export default gql`
  type SessionItem {
    pages: [Page!]!
    section: Section!
  }

  type SessionItems {
    items: [SessionItem!]!
  }

  input SessionInput {
    campaign: ID!
  }

  extend type Query {
    session(input: SessionInput): [SessionItem!]!
  }

  input SessionItemInput {
    page: ID!
  }

  extend type Mutation {
    addSessionItem(input: SessionItemInput): ID
    removeSessionItem(input: SessionItemInput): ID
  }
`;
