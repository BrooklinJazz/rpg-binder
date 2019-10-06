import React from "react";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, Props } from "@fortawesome/react-fontawesome";
import { Omit } from "../../common/types";

const Loading = (props: Omit<Props, "icon">) => (
  <FontAwesomeIcon {...props} spin pulse icon={faSpinner} />
);

export default Loading;
