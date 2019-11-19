import React, { useState } from "react";
import styled from "styled-components";

import { surface2 } from "../../../common/styles";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { useEntryState } from "../../../context/journal/entry";

const Grid = styled.section`
  grid-area: images;
  background-color: ${surface2};
`;

export const Images = () => {
//   const {images} = useEntryState();
  return (
    <Grid>
      <div>images</div>
    </Grid>
  );
};
