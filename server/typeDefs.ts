import { gql } from "apollo-server";

import campaign from "./campaign/campaign_typedef";
import journal from "./journal/journal_typedef";
import user from "./user/user_typedef";
import session from "./session/session_typedef";

const root = gql`
input SingleID {
  _id: ID!
}

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export default [root, user, campaign, journal, session];
