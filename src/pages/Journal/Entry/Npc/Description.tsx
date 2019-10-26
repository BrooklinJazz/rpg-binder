import React from "react";

import { GridTemplateAreas } from "../../../../common/constants";
import MarkdownPreview from "../../../../components/MarkdownPreview";
import { useNpcEntryContext } from "./context";

const Description = () => {
  const { description, setDescription, save, revert } = useNpcEntryContext();
  return (
    <div className={GridTemplateAreas.NPC_DESCRIPTION}>
      <MarkdownPreview
        revert={revert}
        save={save}
        value={description || ""}
        setter={setDescription}
      />
    </div>
  );
};

export default Description;
