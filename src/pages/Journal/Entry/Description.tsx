import React from "react";
import styled from "styled-components";

import { surface2, primary2, primary1 } from "../../../common/styles";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { useEntryState } from "../../../context/journal/entry";
import { useJournalState } from "../../../context/journal";

const Grid = styled.section`
  grid-area: description;
  background-color: ${surface2};
  overflow-y: scroll;
`;
const HowToCreatePage = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: ${primary2};
  }
  a:visited {
    color: ${primary1};
  }
`;

export const Description = () => {
  const { page } = useJournalState();
  const { description, setDescription, save, revert } = useEntryState();
  if (!page) {
    return (
      <HowToCreatePage>
        <ol>
        <li>Create a Section</li>
        <li>Create a Page</li>
        <li>Select your Page</li>
        <li>Start Editing using <a target="_blank" href="https://www.markdownguide.org/basic-syntax">Feature Rich Markdown!</a></li>
        </ol>
      </HowToCreatePage>
    )
  }
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
