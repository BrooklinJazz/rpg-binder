import React, { useState } from "react";
import styled from "styled-components";

import { phoneBreakpoint, surface1 } from "../../../common/styles";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { JournalModal } from "../Modal";
import { Folders } from "./Folders";

const DragArea = styled.div`
  grid-area: navigator-drag;
  display: flex;
  width: 5px;
  justify-content: center;
  align-items: center;
  cursor: move;
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

const useResizableLogic = () => {
  const { width: screenWidth } = useWindowDimensions();
  const initialWidth = screenWidth * 0.3; // 30% of screen as initial width
  const [width, setWidth] = useState(initialWidth);
  const [lastScreenWidth, setLastScreenWidth] = useState(screenWidth);
  const img = document.createElement("img");
  // using a transparent pixel for the draggable img
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const widthAsVw = 100 / (lastScreenWidth / width);
  const protectedVw = protectedVwFromVw(widthAsVw);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // TODO display move cursor on Drag. currently it is the pointer
    setLastScreenWidth(screenWidth);
    setWidth(e.clientX);
    e.dataTransfer.setDragImage(img, 10, 10);
  };
  // prevent setting to zero on drag end
  const handleDrag = (e: any) => e.clientX !== 0 && setWidth(e.clientX);
  return { protectedVw, handleDragStart, handleDrag };
};

export const FileNavigator = () => {
  const { protectedVw, handleDragStart, handleDrag } = useResizableLogic();
  return (
    <>
      <JournalModal />
      <Grid>
        <Folders width={protectedVw}/>
        <DragArea draggable onDragStart={handleDragStart} onDrag={handleDrag} />
      </Grid>
    </>
  );
};
