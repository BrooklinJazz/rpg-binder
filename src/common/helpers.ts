import {
  faFacebook,
  faGithub,
  faLinkedin,
  faMedium,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import {
  facebookBlue,
  linkedinBlue,
  mediumGreen,
  patreonOrange,
  twitterBlue
} from "../common/styles";
import {
  FACEBOOK_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  LocalStorage,
  MEDIUM_URL,
  PATREON_URL,
  Provider,
  TWITTER_URL
} from "./constants";

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
  str
    .split(" ")
    .map(splitStr => splitStr.charAt(0).toUpperCase() + splitStr.slice(1))
    .join(" ");

export const ProviderList = Object.values(Provider);

export const propsFromProvider = (
  provider: Provider
): { color: string; icon: any; url: string } => {
  switch (provider) {
    case Provider.FACEBOOK:
      return { color: facebookBlue, icon: faFacebook, url: FACEBOOK_URL };
    case Provider.TWITTER:
      return { color: twitterBlue, icon: faTwitter, url: TWITTER_URL };
    case Provider.LINKEDIN:
      return { color: linkedinBlue, icon: faLinkedin, url: LINKEDIN_URL };
    case Provider.MEDIUM:
      return { color: mediumGreen, icon: faMedium, url: MEDIUM_URL };
    case Provider.PATREON:
      return { color: patreonOrange, icon: faPatreon, url: PATREON_URL };
    case Provider.GITHUB:
      return { color: "black", icon: faGithub, url: GITHUB_URL };
    default:
      throw new Error(
        "colorFromProvider called with invalid provider: " + provider
      );
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
