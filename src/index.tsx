import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./api/client";
import App from "./App";
import { Routes } from "./common/routes";
import AuthRoute from "./components/AuthRoute";
import DevComponents from "./DevComponents";
import Login from "./pages/Login/index";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { AuthProvider, useAuthState } from "./context/auth/store";
const PageRouting = () => {
  const { token } = useAuthState();
  return (
    <>
      {/* {process.env.NODE_ENV === "development" && <DevComponents />} */}
      <Switch>
        <AuthRoute
          isAuth={!token}
          redirectUrl={Routes.APP}
          path={Routes.LOGIN}
          component={Login}
        />
        <AuthRoute isAuth={!!token} path={Routes.APP} component={App} />
      </Switch>
    </>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={{ mode: "dark" }}>
          <PageRouting />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
