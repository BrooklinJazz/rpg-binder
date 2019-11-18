import React from "react";
import styled from "styled-components";

import { onSurface, onSurfaceHover, surface1 } from "../../common/styles";
import { Button } from "../../components/StyledButtons";
import { H1 } from "../../components/StyledTypography";
import { CampaignList } from "./CampaignList";
import { useCampaignDispatch } from "../../context/campaign/store";
import { openModal } from "../../context/campaign/actions";

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
  margin: 10px 0;
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

export const SelectCampaign = () => {
  const dispatch = useCampaignDispatch();
  return (
    <Content>
      <Header weight="light">Campaigns</Header>
      <ManageCampaigns>
        <Add onClick={() => dispatch(openModal())}>+ New</Add>
      </ManageCampaigns>
      <CampaignList />
    </Content>
  );
};
