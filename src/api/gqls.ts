import { gql } from "apollo-boost";

export const SIGNUP = gql(`
mutation Signup($email: String!, $password: String!) {
  createUser(input: {email: $email, password: $password}) {
    token
    userId
    tokenExpiration
  }
}
`);

export const LOGIN = gql(`
query Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    token
    userId
    tokenExpiration
  }
}
`);

export const CAMPAIGN = gql(`
query Campaign($campaignId: ID!) {
  campaign(input: {_id: $campaignId}) {
    name
  }
}
`);

export const CAMPAIGNS = gql(`
query {
  campaigns {
    _id
    name
  }
}
`);

export const SECTIONS = gql(`
query Sections($campaign: ID!) {
    sections(input: {campaign: $campaign}) {
      _id
      name
      pages {
        _id
        name
        description
      }
    }
  }
`);

export const UPDATE_OR_CREATE_SECTION = gql(`
  mutation UpdateOrCreateSection($name: String!, $campaign: ID!, $id: ID) {
    updateOrCreateSection(input: {_id: $id, name: $name, campaign: $campaign}) {
        _id
        name
      }
    }
`);

export const UPDATE_OR_CREATE_PAGE = gql(`
  mutation UpdateOrCreatePage($name: String!, $campaign: ID!, $id: ID, $section: ID!, $relatedPages: [ID!]!, $description: String) {
    updateOrCreatePage(input: {_id: $id, name: $name, campaign: $campaign, section: $section, relatedPages: $relatedPages, description: $description}) {
        _id
        name
      }
    }
`);

export const CREATE_CAMPAIGN = gql(`
mutation Campaign($name: String!) {
    createCampaign(input: {name: $name}) {
      _id
      name
    }
  }
`);

export const CREATE_PAGE = gql(`
mutation CreatePage($name: String!, $campaign: ID!) {
    createPage(input: {name: $name, campaign: $campaign}) {
      _id
      name
    }
  }
`);

export const PAGES = gql(`
query Pages($campaign: ID!, $section: ID!) {
    pages(input: {campaign: $campaign, section: $section}) {
      _id
      name
    }
  }
`);

export const PAGE = gql(`
query Page($id: ID!) {
    page(input: {_id: $id}) {
      _id
      name
      description
      relatedPages {
        _id
      }
    }
  }
`);

export const SESSION = gql(`
query Session($campaign: ID!) {
    session(input: {campaign: $campaign}) {
      section {
        _id
        name
      }
      pages {
        _id
        name
      }
    }
  }
`);