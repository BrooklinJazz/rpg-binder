import React, { useState } from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import styled from "styled-components";

import {
  useCampaigns,
  useDeleteCampaign,
  useSelectCampaign
} from "../../../../../api/hooks";
import { DELETE_CAMPAIGN_MESSAGE } from "../../../../../common/constants";
import { confirmAlert } from "../../../../../common/helpers";
import { ICampaign } from "../../../../../common/types";
import { FadeAnimation } from "../../../../../components/FadeAnimation/index";
import { ToolTip } from "../../../../../components/StyledTooltip";
import { selectCampaign } from "../../../../../context/campaign/actions";
import {
  useCampaignDispatch,
  useCampaignState
} from "../../../../../context/campaign/store";
import { ListItem } from "../../ListItem";
import { RightClickMenu } from "../../RightClickMenu";

const Item = ({
  campaign,
  active
}: {
  campaign: ICampaign;
  active: boolean;
}) => {
  const { _id, name } = campaign;
  const select = useSelectCampaign();
  const selectCurrentCampaign = () => select(_id);
  const { deleteCampaign } = useDeleteCampaign();
  const [isDeleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
    deleteCampaign(_id);
  };
  const confirmDelete = () =>
    confirmAlert({
      onConfirm: handleDelete,
      message: DELETE_CAMPAIGN_MESSAGE
    });
  if (isDeleted) {
    return null;
  }
  return (
    <>
      <ContextMenuTrigger id={_id}>
        <ListItem
          data-tip
          data-for={_id}
          active={active}
          onClick={selectCurrentCampaign}
          key={campaign._id}
        >
          <ToolTip id={_id}>{name}</ToolTip>
          {name}
        </ListItem>
      </ContextMenuTrigger>
      <RightClickMenu
        handleDelete={confirmDelete}
        select={selectCurrentCampaign}
        id={_id}
      />
    </>
  );
};

const List = styled(FadeAnimation)`
  display: flex;
  flex-direction: column;
grid-area: campaign-list;
  background-color: orange;
`;

export const CampaignList = ({ open }: { open: boolean }) => {
  const { campaigns } = useCampaigns();
  const { activeCampaign } = useCampaignState();
  const renderCampaigns = () =>
    campaigns &&
    campaigns.map(campaign => (
      <Item
        active={campaign._id === activeCampaign}
        key={campaign._id}
        campaign={campaign}
      />
    ));
  return (
      <List open={open}>{renderCampaigns()}</List>
  );
};
