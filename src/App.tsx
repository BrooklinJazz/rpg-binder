import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { Routes } from "./common/routes";
import AuthRoute from "./components/AuthRoute";
import { useCampaignState } from "./context/campaign/store";
import CampaignSelect from "./pages/Campaigns";
import Journal from "./pages/Journal";
import { CampaignModal } from "./pages/Campaigns/Modal";

const App: React.FC = () => {
  const { activeCampaign } = useCampaignState();
  return (
    <>
      {/* TODO unify modal rendering */}
      <CampaignModal />
      <Switch>
        <AuthRoute
          path={Routes.JOURNAL}
          isAuth={Boolean(activeCampaign)}
          component={Journal}
          redirectUrl={Routes.CAMPAIGN_SELECT}
        />
        <Route path={Routes.CAMPAIGN_SELECT} component={CampaignSelect} />
        <Redirect
          to={activeCampaign ? Routes.JOURNAL : Routes.CAMPAIGN_SELECT}
        />
      </Switch>
    </>
  );
};

export default App;
