import "./App.scss";

import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { Routes } from "./common/routes";
import CampaignSelect from "./pages/CampaignSelect";

const App: React.FC = () => {
  const activeCampaign = undefined; // TODO implement active campaign redirecting user to campaign page

  return (
    <div className="App">
      <Switch>
        <Route path={Routes.CampaignSelect} component={CampaignSelect} />
        <Redirect to={Routes.CampaignSelect} />
      </Switch>
    </div>
  );
};

export default App;
