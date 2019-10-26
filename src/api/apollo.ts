import ApolloClient, { gql } from "apollo-boost";

import { LocalStorage } from "../common/constants";
import { valueFromStorage } from "../common/helpers";

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: operation => {
    const token = valueFromStorage(LocalStorage.TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

interface IGraphQLVariables {
  [key: string]: "String" | "String!";
}

const constructVariables = (variables?: IGraphQLVariables) =>
  variables
    ? Object.keys(variables)
        .map(key => `$${key}: ${variables[key]}`)
        .join(", ")
    : "";
const constructInput = (variables?: IGraphQLVariables) =>
  variables
    ? `input: {${Object.keys(variables)
        .map(key => `${key}: $${key}`)
        .join(", ")}}`
    : "";
const constructRetval = (retVal: string[]) =>
  retVal.join(`
`);

const graphRequest = ({
  type,
  action,
  variables,
  retVal
}: {
  type: "mutation" | "query";
  action: string;
  variables?: IGraphQLVariables;
  retVal: string[];
}) => gql`
  ${type} passVariables(${constructVariables(variables)}) {
    ${action}(${constructInput(variables)}) {
      ${constructRetval(retVal)}
    }
  }
`;

export const LOGIN = graphRequest({
  type: "query",
  action: "login",
  variables: { email: "String!", password: "String!" },
  retVal: ["token", "userId", "tokenExpiration"]
});

export const SIGNUP = graphRequest({
  type: "mutation",
  action: "createUser",
  variables: { email: "String!", password: "String!" },
  retVal: ["token", "userId", "tokenExpiration"]
});

export const CAMPAIGN_NAMES = gql(`
  query {
    campaigns {
      _id
      name
    }
  }
`);

export const AUTO_LOGIN = gql(`
  query {
    login
  }
`);

export const CAMPAIGN = gql(`
  query Campaign($campaignId: ID!) {
      campaign(input: {_id: $campaignId}) {
        _id
        name
        description
      }
    }
`);

export const LOCATION_NAME = gql(`
  query Location($locationId: ID!) {
      location(input: {_id: $locationId}) {
        _id
        name
      }
    }
`);

export const NPCS = gql(`
  query Npcs($locationId: String, $campaignId: String) {
      npcs(input: {location: $locationId, campaign: $campaignId}) {
        _id
        name
      }
    }
`);

export const NPC = gql(`
  query Npcs($id: ID!) {
      npc(input: {_id: $id}) {
        _id
        name
        description
        details
        avatar
      }
    }
`);

export const SAVE_NPC = gql(`
  mutation SaveNpc($id: ID!, $name: String!, $description: String, $avatar: Upload) {
      updateNpc(input: {_id: $id, name: $name, description: $description, avatar: $avatar}) {
        _id
        name
        description
      }
    }
`);

export const ORGANIZATIONS = gql(`
  query Organizations($locationId: String, $campaignId: String) {
      organizations(input: {location: $locationId, campaign: $campaignId}) {
        _id
        name
      }
    }
`);

export const LOCATIONS = gql(`
  query Locations($locationId: String, $campaignId: String) {
      locations(input: {location: $locationId, campaign: $campaignId}) {
        _id
        name
      }
    }
`);

export const CREATE_CAMPAIGN = gql(`
  mutation CreateCampaign($name: String!) {
      createCampaign(input: {name: $name}) {
        _id
        name
      }
    }
`);
