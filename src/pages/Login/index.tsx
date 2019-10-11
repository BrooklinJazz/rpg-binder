import "./Login.scss";

import combineClasses from "combine-classes";
import React, { useEffect, useState } from "react";

import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { LOGIN, SIGNUP } from "../../api/apollo";
import { Theme } from "../../common/theme";
import { DefaultButton, SuccessButton } from "../../components/Button";
import Form from "../../components/Inputs/Form";
import Label from "../../components/Inputs/Label";
import Text from "../../components/Inputs/TextInput";
import { authRequestSuccess } from "../../context/auth/actions";
import { useAuthDispatch } from "../../context/auth/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = React.useState(true);
  const [signUp, signUpRes] = useMutation<
    { createUser: { token: string } },
    { email: string; password: string }
  >(SIGNUP);
  const [login, loginRes] = useLazyQuery<
    { login: { token: string } },
    { email: string; password: string }
  >(LOGIN);
  const error = isSigningUp
    ? signUpRes.error && signUpRes.error.message
    : loginRes.error && loginRes.error.message;
  const dispatch = useAuthDispatch();
  // TODO refactor using onCompleted and onError
  useEffect(() => {
    if (loginRes.data) {
      dispatch(authRequestSuccess({ token: loginRes.data.login.token }));
    } else if (signUpRes.data) {
      dispatch(authRequestSuccess({ token: signUpRes.data.createUser.token }));
    }
  }, [loginRes.data, signUpRes.data]);
  const authenticateUser = () => {
    const input = { variables: { email, password } };
    if (isSigningUp) {
      signUp(input);
    } else {
      login(input);
    }
  };
  return (
    <div className={"Login_"}>
      <Form
        isLoading={isSigningUp ? signUpRes.loading : loginRes.loading}
        onSubmit={authenticateUser}
        className={combineClasses(Theme.default, "Login_Form")}
        error={error}
      >
        <h1 className={"Login_Header"}>{isSigningUp ? "Sign Up" : "Log In"}</h1>
        <div className={"Login_Content"}>
          <Label htmlFor="email" label="Email">
            <Text
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Label>
          <Label htmlFor="password" label="Password">
            <Text
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Label>
        </div>
        <div className={"Login_Buttons"}>
          <DefaultButton
            onClick={e => {
              e.preventDefault();
              setIsSigningUp(!isSigningUp);
            }}
            variant="text"
            className="Switch"
          >
            switch to {isSigningUp ? "log in" : "sign up"}
          </DefaultButton>
          <SuccessButton className="Submit">
            {isSigningUp ? "Sign Up" : "Log In"}
          </SuccessButton>
        </div>
      </Form>
    </div>
  );
};

export default Login;
