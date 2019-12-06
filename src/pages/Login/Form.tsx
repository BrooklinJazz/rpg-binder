import React, { useState } from "react";
import styled from "styled-components";

import { useLogin, useSignup } from "../../api/hooks";
import { capitalizeAll } from "../../common/helpers";
import { modalSpacing } from "../../common/styles";
import { DefaultButton, PrimaryButton } from "../../components/StyledButtons";
import { Form as BaseForm } from "../../components/StyledForm";
import { Input } from "../../components/StyledInput";
import { Label } from "../../components/StyledLabel";
import { H1 } from "../../components/StyledTypography";
import {useAuth0} from "../../react-auth0-spa"
const Form = styled(BaseForm)`
  grid-area: login_form;
  padding: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: ${modalSpacing};
  button {
    margin-left: 10px;
  }
`;

export const LoginForm = () => {
  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { signUp, loading: signUpLoading, error: signUpError } = useSignup();

  const [state, setState] = useState<"login" | "sign up">("login");
  const oppositeState = state === "login" ? "sign up" : "login";

  const loading = state === "login" ? loginLoading : signUpLoading;
  const error = state === "login" ? loginError : signUpError;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState(oppositeState);
  };
  const submit = () => {
    const input = { email, password };
    if (state === "login") {
      login(input);
    } else {
      signUp(input);
    }
  };
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
      <Form error={error} loading={loading} onSubmit={submit}>
        <H1>{capitalizeAll(state)}</H1>
        <Label>
          Email
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Label>
        <Label>
          Password
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Label>
        <ButtonWrapper>
          <DefaultButton type="button" onClick={toggleState}>
            Switch to {oppositeState}
          </DefaultButton>
          <PrimaryButton type="submit">{capitalizeAll(state)}</PrimaryButton>
        </ButtonWrapper>
      </Form>
      <DefaultButton onClick={() => loginWithRedirect({})}>TESTING AUTH0</DefaultButton>
    </>
  );
};
