import "./JournalNavbar.scss";

import combineClasses from "combine-classes/lib";
import React from "react";

import { useQuery } from "@apollo/react-hooks";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faPatreon
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CAMPAIGN } from "../../../api/apollo";
import { GridTemplateAreas, PROJECT_NAME } from "../../../common/constants";
import { Theme } from "../../../common/theme";
import Loading from "../../../components/Loading";
import { H1, H2, Text } from "../../../components/Typeography";
import { useCampaignState } from "../../../context/campaign/store";

const JournalNavbar = () => {
  const { activeCampaign } = useCampaignState();
  const { data } = useQuery<
    { campaign: { name: string } },
    { campaignId: string }
  >(CAMPAIGN, { variables: { campaignId: activeCampaign! } });
  return (
    <div
      className={combineClasses(
        GridTemplateAreas.NAVBAR,
        Theme.primary,
        "JournalNavbar"
      )}
    >
      <H1 fontWeight="light" elementStyle="H3">
        {PROJECT_NAME}
      </H1>
      <Text fontWeight="medium" size="large">
        {data ? data.campaign.name : <Loading />}
      </Text>
      <div className="JournalNavbarRight">
        <FontAwesomeIcon className="JournalNavbarSpacing" icon={faFacebook} />
        <FontAwesomeIcon className="JournalNavbarSpacing" icon={faTwitter} />
        <FontAwesomeIcon className="JournalNavbarSpacing" icon={faLinkedin} />
        <FontAwesomeIcon className="JournalNavbarSpacing" icon={faInstagram} />
        <FontAwesomeIcon className="JournalNavbarSpacing" icon={faPatreon} />
        <Text className="JournalNavbarSpacing">Sign Out</Text>
      </div>
    </div>
  );
};

export default JournalNavbar;
