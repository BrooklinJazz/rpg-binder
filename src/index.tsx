import "./index.scss";

import jwt from "jsonwebtoken";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Switch } from "react-router-dom";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";

import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./api/client";
import App from "./App";
import { Routes } from "./common/routes";
import AuthRoute from "./components/AuthRoute";
import { AuthProvider, useAuthState } from "./context/auth/store";
import { CampaignProvider } from "./context/campaign/store";
import { JournalModalProvider, JournalStateProvider } from "./context/journal";
import { EntryStateProvider } from "./context/journal/entry";
import { ThemeProvider, useThemeState } from "./context/theme/store";
import DevComponents from "./DevComponents";
import history from "./history";
import Login from "./pages/Login/index";
import * as serviceWorker from "./serviceWorker";

import config from "./auth_config.json";
import { Auth0Provider, useAuth0 } from "./react-auth0-spa";

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const PageRouting = () => {
  const { isAuthenticated, loading, loginWithRedirect } = useAuth0();
  const { theme } = useThemeState();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithRedirect({})
    }
  }, [loading, isAuthenticated]);
  if (loading) {
    // TODO add loading spinner
    return;
  }

  return (
    <StyledComponentThemeProvider theme={{ mode: theme }}>
      {process.env.NODE_ENV === "development" && <DevComponents />}
      <App />
    </StyledComponentThemeProvider>
  );
};

ReactDOM.render(
  // tslint:disable-next-line: jsx-wrap-multiline
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    // @ts-ignore
    onRedirectCallback={onRedirectCallback}
  >
    <Router history={history}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <CampaignProvider>
            <JournalStateProvider>
              <JournalModalProvider>
                <EntryStateProvider>
                  <ThemeProvider>
                    <PageRouting />
                  </ThemeProvider>
                </EntryStateProvider>
              </JournalModalProvider>
            </JournalStateProvider>
          </CampaignProvider>
        </AuthProvider>
      </ApolloProvider>
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
