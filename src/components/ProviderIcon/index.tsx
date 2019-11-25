import "./ProviderIcon.scss";

import combineClasses from "combine-classes/lib";
import React from "react";
import styled, { css } from "styled-components";

import {
  faFacebook,
  faLinkedin,
  faMedium,
  faPatreon,
  faTwitter,
  faGithub
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
import { propsFromProvider } from "../../common/helpers";

interface IProps extends Omit<FontAwesomeIconProps, "icon"> {
  provider: Provider;
  colored?: boolean;
}

const ProviderIcon = styled(Icon).attrs((props: IProps) => ({
  icon: propsFromProvider(props.provider).icon
}))`
  /* if colored, set provider color. otherwise keep as onSurface  */
  & {
    color: ${(props: IProps) =>
      props.colored
        ? propsFromProvider(props.provider).color
        : onSurface(props)};
  }
  /* if hoverable, set hover color as provider color */
  &:hover {
    cursor: pointer;
    color: ${props => propsFromProvider(props.provider).color};
  }
`;

export default ProviderIcon;
