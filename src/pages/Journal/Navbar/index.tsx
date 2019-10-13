import "./JournalNavbar.scss";

import combineClasses from "combine-classes/lib";
import React from "react";

import { useQuery } from "@apollo/react-hooks";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faMedium,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CAMPAIGN } from "../../../api/apollo";
import {
  GridTemplateAreas,
  phoneBreakpoint,
  PROJECT_NAME
} from "../../../common/constants";
import { Theme } from "../../../common/theme";
import Loading from "../../../components/Loading";
import { H1, H2, Text } from "../../../components/Typeography";
import { logoutAction } from "../../../context/auth/actions";
import { useAuthDispatch } from "../../../context/auth/store";
import { useCampaignState } from "../../../context/campaign/store";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import DesktopNavbar from "./desktop";
import MobileNavbar from "./mobile";

export interface IJournalNavbarProps {
  campaignName: string | undefined;
  logout: () => void;
}

const JournalNavbar = () => {
  const { activeCampaign } = useCampaignState();
  const { data } = useQuery<
    { campaign: { name: string } },
    { campaignId: string }
  >(CAMPAIGN, { variables: { campaignId: activeCampaign! } });
  const dispatch = useAuthDispatch();
  const { width } = useWindowDimensions();
  const logout = () => dispatch(logoutAction());
  if (width < phoneBreakpoint) {
    return <MobileNavbar campaignName={data && data.campaign.name} logout={logout} />;
  } else {
    return (
      <DesktopNavbar
        campaignName={data && data.campaign.name}
        logout={logout}
      />
    );
  }
};

export default JournalNavbar;
