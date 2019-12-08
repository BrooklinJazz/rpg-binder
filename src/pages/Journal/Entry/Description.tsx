import React from "react";
import styled from "styled-components";

import { surface2 } from "../../../common/styles";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { useEntryState } from "../../../context/journal/entry";

const Grid = styled.section`
  grid-area: description;
  background-color: ${surface2};
  overflow-y: scroll;
`;

export const Description = () => {
  const { description, setDescription, save, revert } = useEntryState();
  return (
    <Grid>
      <MarkdownEditor
        revert={revert}
        save={save}
        value={description || ""}
        setter={setDescription}
      />
    </Grid>
  );
};
