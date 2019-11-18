import React from "react";
import styled from "styled-components";
import { modalSpacing, onSurface } from "../../common/styles";

export const Label = styled.label`
  margin-top: ${modalSpacing};
  width: 100%;
  display: inline-block;
  color: ${onSurface};
  * {
    margin-top: 10px;
  }
`;
