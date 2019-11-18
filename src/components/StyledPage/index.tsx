import React from "react";
import styled from "styled-components";
import { background } from "../../common/styles";

export const Page = styled.section`
  height: 100vh;
  width: 100vw;
  min-height: 0;
  min-width: 0;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  background: ${background};
`;
