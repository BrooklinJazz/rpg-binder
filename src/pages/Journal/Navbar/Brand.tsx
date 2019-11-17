import React from "react";
import styled from "styled-components";

import { onPrimary } from "../../../common/styles";
import { H1 } from "../../../components/Typeography";

export const Brand = styled(H1)`
  grid-area: left;
  color: ${onPrimary};
`;
