export enum JournalStates {
  init = "init",
  displayNpcs = "displayNpcs",
  displayOrganizations = "displayOrganizations",
  displayLocations = "displayLocations",
  selectedNpc = "selectedNpc",
  selectedOrganization = "selectedOrganization",
  selectedLocation = "selectedLocation"
}

export interface INameAndId {
  id: string;
  name: string;
}

export interface IJournalContext {
  selectedNpc: undefined | INameAndId;
  parentLocations: INameAndId[];
  selectedLocation: undefined | INameAndId;
  selectedOrganization: undefined | INameAndId;
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
  CHANGE_CAMPAIGN = "CHANGE_CAMPAIGN",
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

export interface IChangeCampaign {
  type: JournalEvents.CHANGE_CAMPAIGN;
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
  | IChangeCampaign
  | IDisplayOrganizations;
