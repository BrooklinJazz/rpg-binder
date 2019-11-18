import { gql } from "apollo-server";

export default gql`
  input UserInput {
    email: String!
    password: String
  }

  type User {
    _id: ID
    email: String!
    password: String
    campaigns: [Campaign!]!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  extend type Query {
    login(input: UserInput): AuthData
  }

  extend type Mutation {
    createUser(input: UserInput): AuthData!
  }
`;
