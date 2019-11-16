import "./CampaignSelect.scss";

import combineClasses from "combine-classes/lib";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";

import { useQuery } from "@apollo/react-hooks";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CAMPAIGNS } from "../../api/gqls";
import {
  GridTemplateAreas,
  pollInterval,
  tabletBreakpoint
} from "../../common/constants";
import { Routes } from "../../common/routes";
import { landscapeBreakpoint, surface1 } from "../../common/styles";
import { Theme } from "../../common/theme";
import Loading from "../../components/Loading";
import { Page } from "../../components/StyledPage";
import { H1 } from "../../components/StyledTypography";
import { selectCampaign } from "../../context/campaign/actions";
import { useCampaignDispatch } from "../../context/campaign/store";
import CreateCampaignModal from "./CampaignModal";

const CampaignPage = styled(Page)`
  display: grid;
  grid-template-rows: 20px 60% 20%;
  grid-template-columns: 20% 60% 20%;
  grid-template-areas:
    ". . ."
    ". content ."
    ". . .";

  @media (max-width: ${landscapeBreakpoint}) {
    grid-template-rows: 20px 60% 20%;
    grid-template-columns: 10% 80% 10%;
    grid-template-areas:
      ". . ."
      ". content ."
      ". . .";
  }
  @media (max-width: ${tabletBreakpoint}) {
    grid-template-rows: 20px 60% 20%;
    grid-template-columns: 100%;
    grid-template-areas:
      "."
      "content"
      ".";
  }
`;

const CampaignContent = styled.div`
  grid-area: content;
  background: ${surface1};
`;

const Header = styled(H1)``;

const CampaignSelect = ({ history }: RouteComponentProps) => {
  const { data, loading } = useQuery<{
    campaigns: { _id: string; name: string }[];
  }>(CAMPAIGNS, { pollInterval });
  const dispatch = useCampaignDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <CampaignPage>
      <CampaignContent>
        {/* <Header>Campaigns</Header> */}
      </CampaignContent>
    </CampaignPage>
    // <>
    //   {modalIsOpen && (
    //     <CreateCampaignModal close={() => setModalIsOpen(false)} />
    //   )}
    //   <div className={combineClasses("CampaignSelect", GridTemplateAreas.PAGE)}>
    //     <div className="CampaignSelectContent">
    //       <div className="CampaignSelectHeader">
    //         <H1 fontWeight="light">Campaigns</H1>
    //       </div>
    //       <div className={combineClasses(Theme.default, "CampaignSelectNew")}>
    //         <Text
    //           onClick={() => setModalIsOpen(true)}
    //           className={combineClasses(Theme.onDefault, Theme.hoverable)}
    //         >
    //           + New
    //         </Text>
    //       </div>
    //       <div className="CampaignSelectList">
    //         {loading && <Loading />}
    //         {data &&
    //           data.campaigns.map(campaign => {
    //             const setCampaign = () => {
    //               history.push(Routes.JOURNAL);
    //               dispatch(selectCampaign({ campaign: campaign._id }));
    //             };
    //             return (
    //               <Text
    //                 className={combineClasses(
    //                   Theme.background,
    //                   Theme.hoverable,
    //                   "CampaignSelectListItem"
    //                 )}
    //                 size="regular"
    //                 onClick={setCampaign}
    //                 key={campaign._id}
    //               >
    //                 <FontAwesomeIcon
    //                   className="CampaignSelectListItemIcon"
    //                   icon={faBookDead}
    //                 />
    //                 {"  "}
    //                 {campaign.name}
    //               </Text>
    //             );
    //           })}
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default withRouter(CampaignSelect);
