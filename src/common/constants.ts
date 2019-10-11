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
  CONTENT = "CONTENT"
}

export const pollInterval = 1000;
