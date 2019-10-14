export enum JournalStates {
  init = "init",
  displayNpcs = "displayNpcs",
  displayOrganizations = "displayOrganizations",
  displayLocations = "displayLocations",
  selectedNpc = "selectedNpc",
  selectedOrganization = "selectedOrganization",
  selectedLocations = "selectedLocation"
}

export interface IJournalContext {
  selectedNpc: undefined | string;
  parentLocations: string[];
  selectedLocation: undefined | string;
  selectedOrganization: undefined | string;
}

export interface IJournalStateSchema {
  states: {
    init: {};
    displayNpcs: {};
    displayOrganizations: {};
    displayLocations: {};
    selectedNpc: {};
    selectedOrganization: {};
    selectedLocation: {};
  };
}

export enum JournalEvents {
  DISPLAY_NPCS = "DISPLAY_NPCS",
  DISPLAY_LOCATIONS = "DISPLAY_LOCATIONS",
  DISPLAY_ORGANIZATIONS = "DISPLAY_ORGANIZATIONS",
  SELECT_NPC = "SELECT_NPC",
  SELECT_ORGANIZATION = "SELECT_ORGANIZATION",
  SELECT_LOCATION = "SELECT_LOCATION",
  BACK = "BACK"
}

export interface IDisplayNpcs {
  type: JournalEvents.DISPLAY_NPCS;
}
export interface IDisplayLocations {
  type: JournalEvents.DISPLAY_LOCATIONS;
}
export interface IDisplayOrganizations {
  type: JournalEvents.DISPLAY_ORGANIZATIONS;
}

export interface IBack {
  type: JournalEvents.BACK;
}

export interface ISelectNpc {
  type: JournalEvents.SELECT_NPC;
  selectedNpc: string;
}
export interface ISelectLocation {
  type: JournalEvents.SELECT_LOCATION;
  selectedLocation: string;
}
export interface ISelectOrganization {
  type: JournalEvents.SELECT_ORGANIZATION;
  selectedOrganization: string;
}

export type IJournalActions =
  | ISelectNpc
  | ISelectLocation
  | ISelectOrganization
  | IDisplayNpcs
  | IDisplayLocations
  | IBack
  | IDisplayOrganizations;
