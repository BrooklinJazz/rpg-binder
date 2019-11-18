import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { onPrimary, onPrimaryHover } from "../../../common/styles";

export const HoverIcon = styled(FontAwesomeIcon)`
  color: ${onPrimary};
  &:hover {
    color: ${onPrimaryHover};
    cursor: pointer;
  }
`;
