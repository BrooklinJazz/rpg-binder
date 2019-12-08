import styled from "styled-components";

import { ListHeader as BaseListHeader } from "../ListHeader";

export const SectionHeader = styled(BaseListHeader).attrs(props => ({
  children: "Sections"
}))`
  grid-area: section-header;
`;
