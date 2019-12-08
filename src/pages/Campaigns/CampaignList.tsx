import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { useCampaigns } from "../../api/hooks";
import { Routes } from "../../common/routes";
import { background, onSurface, surface1 } from "../../common/styles";
import { ICampaign } from "../../common/types";
import { Spinner } from "../../components/Loading";
import { Button } from "../../components/StyledButtons";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";

const ListItem = styled(Button)`
  background-color: ${background};
  color: ${onSurface};
  width: 100%;
  display: flex;
  font-size: 1.5em;
  padding: 10px 0;
  height: max-content;
  &:hover {
    background-color: ${surface1};
  }
  * {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

export const CampaignList = () => {
  const { campaigns = [], loading } = useCampaigns();
  const history = useHistory();
  const dispatch = useCampaignDispatch();
  if (loading) {
    return <Spinner />;
  }
  const renderCampaign = (campaign: ICampaign) => {
    const setCampaign = () => {
      history.push(Routes.JOURNAL);
      dispatch(selectCampaign({ campaign: campaign._id }));
    };
    return (
      <ListItem key={campaign._id} onClick={setCampaign}>
        <FontAwesomeIcon
          className="CampaignSelectListItemIcon"
          icon={faBookDead}
        />
        {campaign.name}
      </ListItem>
    );
  };
  const renderCampaigns = () => campaigns.map(renderCampaign);

  return <>{renderCampaigns()}</>;
};
