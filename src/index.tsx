import "./index.scss";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";

import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./api/client";
import App from "./App";
import config from "./auth_config.json";
import { LocalStorage } from "./common/constants";
import { setInStorage } from "./common/helpers";
import { CampaignProvider } from "./context/campaign/store";
import { JournalModalProvider, JournalStateProvider } from "./context/journal";
import { EntryStateProvider } from "./context/journal/entry";
import { ThemeProvider, useThemeState } from "./context/theme/store";
import history from "./history";
import { Auth0Provider, useAuth0 } from "./react-auth0-spa";
import * as serviceWorker from "./serviceWorker";

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const PageRouting = () => {
  const {
    isAuthenticated,
    loading,
    loginWithRedirect,
    user,
    getTokenSilently
  } = useAuth0();
  const { theme } = useThemeState();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithRedirect({});
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    // TODO add loading spinner
    return <div />;
  }

  const setToken = async () => {
    const token = await getTokenSilently();
    setInStorage(LocalStorage.TOKEN, token);
  };
  // used in apollo client for now TODO remove
  setToken();

  return (
    <StyledComponentThemeProvider theme={{ mode: theme }}>
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
    audience={config.audience}
    // @ts-ignore
    onRedirectCallback={onRedirectCallback}
  >
    <Router history={history}>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
