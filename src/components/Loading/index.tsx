import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Icon } from "../StyledIcon";

export const Spinner = styled(Icon).attrs(props => ({
  spin: true,
  pulse: true,
  icon: faSpinner
}))``