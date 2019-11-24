export const BASE_URL = "http://localhost:4000";

export enum LocalStorage {
  TOKEN = "token",
  ACTIVE_CAMPAIGN = "active-campaign",
  THEME = "theme"
}

export const FACEBOOK_URL =
  "https://www.facebook.com/Brooklin-Myers-100515724763552/?modal=admin_todo_tour";
export const MEDIUM_URL = "https://medium.com/@brooklinjazzmyers";
export const TWITTER_URL = "https://twitter.com/BrooklinJMyers";
export const GITHUB_URL = "https://github.com/BrooklinJazz";
export const LINKEDIN_URL = "https://www.linkedin.com/in/brooklinmyers/";
export const PATREON_URL = "https://www.patreon.com/user/creators?u=27328350";

// used for defining the grid template area for a component
/**
 * NAVBAR
 * PAGE(SIDEBAR, CONTENT)
 */
export enum GridTemplateAreas {
  NAVBAR = "NAVBAR",
  PAGE = "PAGE",
  SIDEBAR = "SIDEBAR",
  CONTENT = "CONTENT",
  ENTRY_HEADING = "ENTRY_HEADING",
  ENTRY_CONTENT = "ENTRY_CONTENT",
  ENTRY_SIDEBAR = "ENTRY_SIDEBAR",
  NPC_STATBLOCK = "NPC_STATBLOCK",
  NPC_AVATAR = "NPC_AVATAR",
  NPC_DESCRIPTION = "NPC_DESCRIPTION",
  NPC_DETAILS = "NPC_DETAILS"
}

export const PROJECT_NAME = "DM Binder";

export const pollInterval =
  process.env.NODE_ENV === "development" ? 4000 : 1000;

export enum Provider {
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  MEDIUM = "medium",
  PATREON = "patreon",
  GITHUB = "github"
}

export const PAGE_NAME_LENGTH = 40;
export const SECTION_NAME_LENGTH = 40;

export const DELETE_SECTION_MESSAGE =
  "This will also delete this section's pages";
export const DELETE_CAMPAIGN_MESSAGE =
  "This will also delete this campaign's sections and pages";
