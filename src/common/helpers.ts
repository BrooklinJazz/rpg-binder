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

export const ProviderList = Object.values(Provider);
