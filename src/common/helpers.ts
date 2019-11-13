import { JournalModalStates } from "../context/journal";
import { JournalStates } from "../context/journal/types";
import { LocalStorage, Provider } from "./constants";

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

export const capitalizeAll = (str: string) =>
  str.split(" ").map(splitStr => splitStr.charAt(0).toUpperCase() + splitStr.slice(1)).join(" ");

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

export const confirmAlert = ({
  message = "closing now will discard changes",
  onConfirm
}: {
  message?: string;
  onConfirm: Function;
}) => {
  const result = window.confirm(message);
  if (result) {
    onConfirm();
  }
};
