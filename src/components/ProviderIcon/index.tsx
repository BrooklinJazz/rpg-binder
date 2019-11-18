import "./ProviderIcon.scss";

import combineClasses from "combine-classes/lib";
import React from "react";
import styled, { css } from "styled-components";

import {
  faFacebook,
  faLinkedin,
  faMedium,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import { Provider } from "../../common/constants";
import {
  facebookBlue,
  linkedinBlue,
  mediumGreen,
  onSurface,
  patreonOrange,
  twitterBlue
} from "../../common/styles";
import { Omit } from "../../common/types";
import { Icon } from "../StyledIcon";

interface IProps extends Omit<FontAwesomeIconProps, "icon"> {
  provider: Provider;
  colored?: boolean;
  hoverable?: boolean;
}

const propsFromProvider = (
  provider: Provider
): { color: string; icon: any } => {
  switch (provider) {
    case Provider.FACEBOOK:
      return { color: facebookBlue, icon: faFacebook };
    case Provider.TWITTER:
      return { color: twitterBlue, icon: faTwitter };
    case Provider.LINKEDIN:
      return { color: linkedinBlue, icon: faLinkedin };
    case Provider.MEDIUM:
      return { color: mediumGreen, icon: faMedium };
    case Provider.PATREON:
      return { color: patreonOrange, icon: faPatreon };
    default:
      throw new Error(
        "colorFromProvider called with invalid provider: " + provider
      );
  }
};
const ProviderIcon = styled(Icon).attrs((props: IProps) => ({
  icon: propsFromProvider(props.provider).icon
}))`
  /* if colored, set provider color. otherwise keep as onSurface  */
  & {
  color: ${(props: IProps) =>
    props.colored ? propsFromProvider(props.provider).color : onSurface(props)};
  }
  /* if hoverable, set hover color as provider color */
  &:hover {
    ${(props: IProps) =>
      props.hoverable &&
      css`
        cursor: pointer;
        color: ${propsFromProvider(props.provider).color};
      `}
  }
`;

export default ProviderIcon;
