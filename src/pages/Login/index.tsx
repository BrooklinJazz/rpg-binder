import React from "react";
import styled, { css } from "styled-components";
import { tabletStyles } from "../../common/styles";
import { surface1, background, onSurface } from "../../common/styles";

const Page = styled.div`
  height: 100vh;
  width: 100vw;
`;

const LoginGrid = styled(Page)`
  background-color: ${background};
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    ". . ."
    ". login_form ."
    ". . .";
  ${tabletStyles(
    css`
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr;
      grid-template-areas:
        "."
        "login_form"
        ".";
    `
  )}
`;

const LoginForm = styled.form`
  background-color: ${surface1};
  grid-area: login_form;
  color: ${onSurface};
`;

const LoginPage = () => {
  return (
    <LoginGrid>
      <LoginForm />
    </LoginGrid>
  );
};

export default LoginPage;
