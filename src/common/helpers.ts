import { LocalStorage, Provider } from "./constants";
import { JournalStates } from "../context/journal/types";
import { JournalModalStates } from "../context/journal";

export const valueFromStorage = (key: LocalStorage) =>
  localStorage.getItem(key) || undefined;

export const parseFromStorage = (key: LocalStorage): {} => {
  const unparsedString = valueFromStorage(key);
  return unparsedString ? JSON.parse(unparsedString) : undefined;
};

export const setInStorage = (key: LocalStorage, value: string) =>
  localStorage.setItem(key, value);

export const removeFromStorage = (key: LocalStorage) =>
  localStorage.removeItem(key);

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const ProviderList = Object.values(Provider);

export const typeToCreateFromState = (state: JournalStates) => {
  switch (state) {
    case JournalStates.displayLocations:
      return "Location";
    case JournalStates.displayNpcs:
    case JournalStates.selectedNpc:
      return "Npc";
    case JournalStates.displayOrganizations:
    case JournalStates.selectedOrganization:
      return "Organization";
    default:
      return undefined;
  }
};

export const modalStateFromTypeToCreate = (
  typeToCreate: ReturnType<typeof typeToCreateFromState>
) => {
  switch (typeToCreate) {
    case "Location":
      return JournalModalStates.CREATE_LOCATION;
    case "Organization":
      return JournalModalStates.CREATE_ORGANIZATION;
    case "Npc":
      return JournalModalStates.CREATE_NPC;
    default:
      break;
  }
};

export const titleFromJournalModalState = (state: JournalModalStates) => {
  switch (state) {
    case JournalModalStates.CREATE_LOCATION:
      return "Create Location";
    case JournalModalStates.CREATE_ORGANIZATION:
      return "Create Organization";
    case JournalModalStates.CREATE_NPC:
      return "Create Npc";
    case JournalModalStates.CREATE_SECTION:
      return "Create Section";
    default:
      break;
  }
};
