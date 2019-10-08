import "./App.scss";

import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { Routes } from "./common/routes";
import AuthRoute from "./components/AuthRoute";
import { useCampaignState } from "./context/campaign/store";
import CampaignSelect from "./pages/CampaignSelect";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const { activeCampaign } = useCampaignState();

  return (
    <div className="App">
      <Switch>
        <AuthRoute
          path={Routes.DASHBOARD}
          isAuth={Boolean(activeCampaign)}
          component={Dashboard}
          redirectUrl={Routes.CAMPAIGN_SELECT}
        />
        <Route path={Routes.CAMPAIGN_SELECT} component={CampaignSelect} />
        <Redirect
          to={activeCampaign ? Routes.DASHBOARD : Routes.CAMPAIGN_SELECT}
        />
      </Switch>
    </div>
  );
};

export default App;
