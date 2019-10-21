import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { GridTemplateAreas } from "../../../../common/constants";
import useClickoutHandler from "../../../../hooks/useClickoutHandler";
import MarkdownPreview from "../../../../components/MarkdownPreview";

const Description = () => (
  <div className={GridTemplateAreas.NPC_DESCRIPTION}>
    <MarkdownPreview />
  </div>
);

export default Description;
