import React, { useState } from "react";
import styled from "styled-components";

import { surface2 } from "../../../common/styles";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { useEntryState } from "../../../context/journal/entry";

const Grid = styled.section`
  grid-area: name;
  background-color: ${surface2};
`;

export const Name = () => {
  const { name } = useEntryState();
  return (
    <Grid>
      <div>{name}</div>
    </Grid>
  );
};
