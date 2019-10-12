import combineClasses from "combine-classes/lib";
import React from "react";

import {
  faFacebook,
  faLinkedin,
  faMedium,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";

import { Provider } from "../../common/constants";
import { Omit } from "../../common/types";

import "./ProviderIcon.scss";

interface IProps extends Omit<FontAwesomeIconProps, "icon"> {
  provider: Provider;
  colored?: boolean;
  hoverable?: boolean;
}

const getIcon = (provider: Provider) => {
  switch (provider) {
    case Provider.FACEBOOK:
      return faFacebook;
    case Provider.LINKEDIN:
      return faLinkedin;
    case Provider.TWITTER:
      return faTwitter;
    case Provider.MEDIUM:
      return faMedium;
    case Provider.PATREON:
      return faPatreon;
    default:
      throw new Error("Rendered ProviderIcon without provider: " + provider);
  }
};

const ProviderIcon = ({
  provider,
  colored = false,
  hoverable = false,
  ...props
}: IProps) => (
  <FontAwesomeIcon
    {...props}
    className={combineClasses(
      "ProviderIcon",
      provider,
      [hoverable, "hover"],
      [colored, "colored"],
      props.className
    )}
    icon={getIcon(provider)}
  />
);

export default ProviderIcon;
