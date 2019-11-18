import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { onSurface, onSurfaceHover } from "../../common/styles";

export const Icon = styled(FontAwesomeIcon)`
  color: ${onSurface};
`;

export const HoverableIcon = styled(Icon)`
  color: ${onSurface};
  &:hover {
    color: ${onSurfaceHover};
    cursor: pointer;
  }
`;
