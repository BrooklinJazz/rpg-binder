import React from "react";
import { Route, Switch } from "react-router";

import { Routes } from "./common/routes";
import AuthRoute from "./components/AuthRoute";
import { useCampaignState } from "./context/campaign/store";
import CampaignSelect from "./pages/Campaigns";
import { CampaignModal } from "./pages/Campaigns/Modal";
import Journal from "./pages/Journal";

const App: React.FC = () => {
  const { activeCampaign } = useCampaignState();
  return (
    <>
      <CampaignModal />
      <Switch>
        <AuthRoute
          path={Routes.JOURNAL}
          isAuth={Boolean(activeCampaign)}
          component={Journal}
          redirectUrl={Routes.CAMPAIGN_SELECT}
        />
        <Route path={Routes.CAMPAIGN_SELECT} component={CampaignSelect} />
      </Switch>
    </>
  );
};

export default App;
