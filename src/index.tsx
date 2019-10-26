import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./api/apollo";
import App from "./App";
import { Routes } from "./common/routes";
import AuthRoute from "./components/AuthRoute";
import { selectIsLoggedIn } from "./context/auth/selectors";
import { AuthProvider, useAuthState } from "./context/auth/store";
import { CampaignProvider } from "./context/campaign/store";
import { ThemeProvider } from "./context/theme/store";
import DevComponents from "./DevComponents";
import Login from "./pages/Login";
import * as serviceWorker from "./serviceWorker";

const PageRouting = () => {
  const state = useAuthState();
  const isLoggedIn = selectIsLoggedIn(state);
  return (
    <>
      {process.env.NODE_ENV === "development" && <DevComponents />}
      <Switch>
        <AuthRoute
          isAuth={!isLoggedIn}
          redirectUrl={Routes.APP}
          path={Routes.LOGIN}
          component={Login}
        />
        <AuthRoute isAuth={isLoggedIn} path={Routes.APP} component={App} />
      </Switch>
    </>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <CampaignProvider>
            <PageRouting />
          </CampaignProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
