import React, { useState } from "react";
import styled from "styled-components";

import {
  buttonHeight,
  navigatorWidth,
  surface1,
  INITIAL_NAVIGATOR_WIDTH,
  MIN_NAVIGATOR_WIDTH,
  tabletBreakpoint,
  phoneBreakpoint,
  MAX_NAVIGATOR_WIDTH
} from "../../../common/styles";
import { JournalModal } from "../Modal";
import { Button } from "../../../components/StyledButtons";
import { Icon } from "../../../components/StyledIcon";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const halfNavigatorWidth = `${parseInt(navigatorWidth, 10) / 2}px`;

const DragArea = styled.div`
  grid-area: navigator-drag;
  display: flex;
  width: 5px;
  justify-content: center;
  align-items: center;
  cursor: move;
`;

const Content = styled.div`
  right: 0;
  color: white;
  grid-area: navigator-content;
  width: ${(props: { width: number }) => props.width}vw;
  @media (max-width: ${phoneBreakpoint}) {
    width: 100vw;
  }
`;

const Grid = styled.section`
  background-color: ${surface1};
  grid-area: navigator;
  color: white;
  width: max-content;
  overflow: auto;
  display: grid;
  grid-template-areas: "navigator-content navigator-drag";
  grid-template-colums: max-content 0px;
`;

export const FileNavigator = () => {
  const [width, setWidth] = useState(INITIAL_NAVIGATOR_WIDTH);
  const { width: screenWidth } = useWindowDimensions();
  const [lastScreenWidth, setLastScreenWidth] = useState(screenWidth);
  const img = document.createElement("img");
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const widthAsVw = 100 / (lastScreenWidth / width);
  return (
    <>
      <JournalModal />
      <Grid>
        <Content width={widthAsVw}>Content</Content>
        <DragArea
          draggable
          onDragStart={e => {
            // TODO display move cursor on Drag. currently it is the pointer
            setLastScreenWidth(lastScreenWidth);
            e.dataTransfer.setDragImage(img, 10, 10);
          }}
          onDrag={e => {
            e.clientX > MIN_NAVIGATOR_WIDTH &&
              e.clientX < MAX_NAVIGATOR_WIDTH &&
              setWidth(e.clientX - 2);
          }}
        />
      </Grid>
    </>
  );
};
