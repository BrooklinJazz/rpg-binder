import React, { useState } from "react";
import styled from "styled-components";

import {
  navigatorWidth,
  surface1,
  INITIAL_NAVIGATOR_WIDTH,
  phoneBreakpoint,
} from "../../../common/styles";
import { JournalModal } from "../Modal";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

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

// guarantees vw will not be too small or too large.
const protectedVwFromVw = (vw: number) => {
  if (vw > 70) {
    return 70;
  } else if (vw < 20) {
    return 20;
  } else {
    return vw;
  }
};

export const FileNavigator = () => {
  const [width, setWidth] = useState(INITIAL_NAVIGATOR_WIDTH);
  const { width: screenWidth } = useWindowDimensions();
  const [lastScreenWidth, setLastScreenWidth] = useState(screenWidth);
  const img = document.createElement("img");
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const widthAsVw = 100 / (lastScreenWidth / width);
  const protectedVw = protectedVwFromVw(widthAsVw);
  return (
    <>
      <JournalModal />
      <Grid>
        <Content width={protectedVw}>Content</Content>
        <DragArea
          draggable
          onDragStart={e => {
            // TODO display move cursor on Drag. currently it is the pointer
            setLastScreenWidth(screenWidth);
            setWidth(e.clientX)
            e.dataTransfer.setDragImage(img, 10, 10);
          }}
          // prevent setting to zero on drag end
          onDrag={e => e.clientX !== 0 && setWidth(e.clientX)}
        />
      </Grid>
    </>
  );
};
