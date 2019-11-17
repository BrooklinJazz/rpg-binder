import combineClasses from "combine-classes/lib";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { useQuery } from "@apollo/react-hooks";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CAMPAIGNS } from "../../api/gqls";
import { GridTemplateAreas, pollInterval } from "../../common/constants";
import { Routes } from "../../common/routes";
import {
  landscapeBreakpoint,
  onSurface,
  surface1,
  tabletBreakpoint,
  background,
  hover,
  onSurfaceHover
} from "../../common/styles";
import { Theme } from "../../common/theme";
import Loading from "../../components/Loading";
import { Page } from "../../components/StyledPage";
import { H1, H3 } from "../../components/StyledTypography";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";
import CreateCampaignModal from "./CampaignModal";
import { Button, DefaultButton } from "../../components/StyledButtons";
import { useCampaigns } from "../../api/hooks";
import { ICampaign } from "../../common/types";

const Grid = styled(Page)`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-columns: 20% 60% 20%;
  grid-template-areas:
    ". . ."
    ". content ."
    ". . .";
  @media (max-width: ${landscapeBreakpoint}) {
    grid-template-columns: 1fr 6fr 1fr;
  }
  @media (max-width: ${tabletBreakpoint}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "."
      "content"
      ".";
  }
`;

const Content = styled.div`
  grid-area: content;
`;

const Header = styled(H1)`
  color: ${onSurface};
`;

const ManageCampaigns = styled.section`
  width: 100%;
  height: 30px;
  background-color: ${surface1};
`;

const Add = styled(Button)`
  background-color: ${surface1};
  color: ${onSurface};
  height: 100%;
  min-width: max-content;
  &:hover {
    color: ${onSurfaceHover};
  }
`;

const ListItem = styled(Button)`
  background-color: ${background};
  width: 100%;
  display: flex;
  font-size: 1.5em;
  padding: 10px 0;
  margin: 2px 0;
  height: max-content;
  &:hover {
    background-color: ${surface1};
  }
  * {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const CampaignList = () => {
  const { campaigns = [], loading } = useCampaigns();
  const history = useHistory();
  const dispatch = useCampaignDispatch();
  if (loading) {
    return <Loading />;
  }
  const renderCampaign = (campaign: ICampaign) => {
    const setCampaign = () => {
      history.push(Routes.JOURNAL);
      dispatch(selectCampaign({ campaign: campaign._id }));
    };
    return (
      <ListItem onClick={setCampaign}>
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

const CampaignSelect = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Grid>
      {modalIsOpen && (
        <CreateCampaignModal close={() => setModalIsOpen(false)} />
      )}
      <Content>
        <Header weight="light">Campaigns</Header>
        <ManageCampaigns>
          <Add onClick={() => setModalIsOpen(true)}>+ New</Add>
        </ManageCampaigns>
        <CampaignList />
      </Content>
    </Grid>
  );
};

export default CampaignSelect;
