import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePinnedItems, usePinPage } from "../../../api/hooks";
import {
  buttonHeight,
  danger1,
  onSurface,
  phoneBreakpoint,
  primary1,
  surface1,
  surface2,
  surface3,
  surface4
} from "../../../common/styles";
import { IPage } from "../../../common/types";
import { FetchContainer } from "../../../components/FetchContainer/index";
import { H2, Text } from "../../../components/StyledTypography";
import { useJournalState } from "../../../context/journal";
import { Star } from "../Navigator/Pages/PageItems";

const Sidebar = styled.section`
  background-color: ${surface1};
  grid-area: sidebar;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr;
  grid-template-rows: ${buttonHeight} 1fr;
  grid-template-areas:
    "sidebar-header"
    "sidebar-content";
  @media (max-width: ${phoneBreakpoint}) {
    display: none;
  }
`;

const Section = styled.section`
  padding: 10px;
  background-color: ${surface2};
  margin-bottom: 5px;
  height: max-content;
`;

const SectionName = styled(H2)`
  margin-bottom: 10px;
`;

const Content = styled.section`
  grid-area: sidebar-content;
  overflow-y: scroll;
`;

const PageContainer = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  .Delete {
    display: none;
  }
  &:hover {
    cursor: pointer;
    .Delete {
      display: inline;
      &:hover {
        color: ${danger1};
      }
    }
  }
`;

const PageName = styled.li`
  margin-right: 10px;
  margin-left: 10px;
  color: ${onSurface};
  /* NOTE remove this basis to keep minus button close to text */
  flex-basis: 80%;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    text-decoration: underline;
  }
  flex-shrink: 1;
`;

const IconContainer = styled.div`
  flex-basis: 20px;
  flex-shrink: 0;
  color: ${onSurface};
`;

interface IProps extends IPage {
  sectionId: string;
}

const PageItem = ({ name, _id, sectionId }: IProps) => {
  const { selectPinned } = useJournalState();
  const { remove } = usePinPage();
  const [hide, setHide] = useState(false);
  const select = () => selectPinned(sectionId, _id);
  const handleRemove = () => {
    remove(_id);
    setHide(true);
  };
  if (hide) {
    return null;
  }
  return (
    <PageContainer>
      <PageName data-tip data-for={_id} key={_id} onClick={select}>
        {name}
      </PageName>
      <ReactTooltip delayShow={1000} id={_id} place="top">
        {name}
      </ReactTooltip>
      <IconContainer onClick={handleRemove}>
        <FontAwesomeIcon className="Delete" icon={faMinusCircle} />
      </IconContainer>
    </PageContainer>
  );
};

const NoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${onSurface};
`;

const StarIcon = styled(Star)`
  margin-right: 5px;
  &:hover {
    color: ${primary1};
  }
`;

const SessionItems = () => {
  const { pinnedItems, loading } = usePinnedItems();
  if (pinnedItems && pinnedItems.length === 0) {
    return (
      <NoContent>
        <StarIcon isPinned={true} /> a page to see it here
      </NoContent>
    );
  }
  return (
    <FetchContainer loading={loading}>
      {pinnedItems.map(({ section, pages }) => {
        return (
          <Section key={section._id}>
            <SectionName weight="medium">{section.name}</SectionName>
            {pages.map(page => (
              <PageItem key={page._id} {...page} sectionId={section._id} />
            ))}
          </Section>
        );
      })}
    </FetchContainer>
  );
};

const SidebarHeader = styled(Text).attrs(props => ({
  children: "Pinned Pages"
}))`
  grid-area: sidebar-header;
  display: flex;
  align-items: center;
  /* margin-bottom: 2px; */
  justify-content: center;
  background-color: ${surface4};
`;

export const SessionSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <Content>
        <SessionItems />
      </Content>
    </Sidebar>
  );
};
