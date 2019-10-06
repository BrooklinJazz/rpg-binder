import "./App.scss";

import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { Routes } from "./common/routes";
import CampaignSelect from "./pages/CampaignSelect";

const App: React.FC = () => {
  const activeCampaign = undefined; // TODO implement active campaign redirecting user to campaign page
  // for now the user must have selected a campaign to view the main app.
  // this may change. but the Campaign Select page should not share app styles
  // because it does not need a side
  if (!activeCampaign) {
    return <CampaignSelect />;
  }
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
