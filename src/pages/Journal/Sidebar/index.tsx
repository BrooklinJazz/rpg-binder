import React, { useState } from "react";
import styled from "styled-components";

import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePinnedItems, usePinPage } from "../../../api/hooks";
import {
  buttonHeight,
  danger1,
  phoneBreakpoint,
  surface1,
  surface2,
  surface3
} from "../../../common/styles";
import { IPage } from "../../../common/types";
import { FetchContainer } from "../../../components/FetchContainer/index";
import { H2, Text } from "../../../components/StyledTypography";
import { useJournalState } from "../../../context/journal";

const Sidebar = styled.section`
  background-color: ${surface1};
  grid-area: sidebar;
  display: grid;
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
  margin-top: 5px;
  height: max-content;
`;

const SectionName = styled(H2)`
  margin-bottom: 5px;
`;

const Content = styled.section`
  grid-area: sidebar-content;
  overflow-y: scroll;
`;

const PageContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
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

const PageName = styled(Text)`
  margin-right: 10px;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
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
      <Text>-</Text>
      <PageName key={_id} onClick={select}>
        {name}
      </PageName>
      <span onClick={handleRemove}>
        <FontAwesomeIcon className="Delete" icon={faMinusCircle} />
      </span>
    </PageContainer>
  );
};

const SessionItems = () => {
  const { pinnedItems, loading } = usePinnedItems();

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
  justify-content: center;
  background-color: ${surface3};
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
