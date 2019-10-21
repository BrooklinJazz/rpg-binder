import { gql } from "apollo-server";
import campaign from "./campaign";
import location from "./location";
import npc from "./npc";
import organization from "./organization";
import user from "./user";

// these types are extended in the other typeDefs files

const root = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export default [root, npc, user, campaign, organization, location];
