import { gql } from "apollo-server";

export default gql`
  type Location {
    _id: ID
    name: String!
    description: String
    creator: User!
    campaign: Location!
    npcs: [Npc!]!
    organizations: [Organization!]!
    locations: [Location!]!
    parentLocation: Location
  }

  input LocationInput {
    name: String!
    description: String
    campaign: String!
    parentLocation: String
  }

  input UpdateLocationInput {
    _id: ID!
    name: String!
    description: String
  }

  input SingleLocationInput {
    _id: ID!
  }

  input Locations {
    campaign: String
    location: String
  }

  extend type Query {
    locations(input: Locations): [Location!]!
    location(input: SingleLocationInput): Location!
  }

  extend type Mutation {
    createLocation(input: LocationInput): Location!
    updateLocation(input: UpdateLocationInput): Location!
    deleteLocation(input: SingleLocationInput): Location!
  }
`;
