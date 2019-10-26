export const BASE_URL = "http://localhost:4000";

export enum LocalStorage {
  TOKEN = "token",
  ACTIVE_CAMPAIGN = "active-campaign",
  THEME = "theme"
}

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
  NPC_DETAILS = "NPC_DETAILS",
}

export const PROJECT_NAME = "DM Binder";

export const pollInterval = 1000;

export const phoneBreakpoint = 600;
export const tabletBreakpoint = 900;
export const landscapeBreakpoint = 1200;

export const navbarHeight = 90;

export enum Provider {
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  MEDIUM = "medium",
  PATREON = "patreon"
}

export const ENTRY_HEADING_MAX_LENGTH = 20;
