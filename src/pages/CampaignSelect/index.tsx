import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCampaigns, useCreateCampaign } from "../../api/hooks";
import { Routes } from "../../common/routes";
import {
  background,
  landscapeBreakpoint,
  modalSpacing,
  onSurface,
  onSurfaceHover,
  surface1,
  tabletBreakpoint
} from "../../common/styles";
import { ICampaign } from "../../common/types";
import Loading from "../../components/Loading";
import { Button, PrimaryButton } from "../../components/StyledButtons";
import { Form } from "../../components/StyledForm";
import { Input } from "../../components/StyledInput";
import { Label } from "../../components/StyledLabel";
import { Modal } from "../../components/StyledModal";
import { Page } from "../../components/StyledPage";
import { H1 } from "../../components/StyledTypography";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";

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
  color: ${onSurface};
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

const CreateButton = styled(PrimaryButton).attrs(props => ({
  children: "Create"
}))`
  margin-top: ${modalSpacing};
  align-self: flex-end;
`;

const CreateForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const CampaignModal = ({
  isOpen,
  close
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [name, setName] = useState("");
  const { create } = useCreateCampaign(close);
  if (!isOpen) {
    return null;
  }
  return (
    <Modal title="Create New Campaign" close={close}>
      <CreateForm onSubmit={() => create(name)}>
        <Label>
          Campaign Name
          <Input value={name} onChange={e => setName(e.target.value)} />
        </Label>
        <CreateButton />
      </CreateForm>
    </Modal>
  );
};

const CampaignSelect = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Grid>
      <CampaignModal isOpen={modalIsOpen} close={() => setModalIsOpen(false)} />
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
