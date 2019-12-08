import styled from "styled-components";
import { ListHeader as BaseListHeader } from "../ListHeader";

export const PageHeader = styled(BaseListHeader).attrs(props => ({
  children: "Pages"
}))`
  grid-area: page-header;
`;
