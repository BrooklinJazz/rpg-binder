import styled from "styled-components";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../StyledIcon";

export const Spinner = styled(Icon).attrs(props => ({
  spin: true,
  pulse: true,
  icon: faSpinner
}))``;
