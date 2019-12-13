import ReactTooltip from "react-tooltip";
import styled from "styled-components";

export const ToolTip = styled(ReactTooltip).attrs(props => ({
  delayShow: 1000,
  place: "top"
}))``;
