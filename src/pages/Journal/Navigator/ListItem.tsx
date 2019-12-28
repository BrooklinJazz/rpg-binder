import styled from "styled-components";

import { hover, surface1, primary1, surface2, surface3, surface4 } from "../../../common/styles";
import { DefaultButton } from "../../../components/StyledButtons";

export const ListItem = styled(DefaultButton)`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: left;
  border-left: ${primary1} solid 2px;
  padding-left: 10px;
  background-color: ${(props: { active?: boolean }) =>
    props.active ? surface4(props) : surface2(props)};
  margin-bottom: 2px;
  .Gear {
    display: none;
  }
  &:hover {
    background-color: ${props =>
      props.active ? surface4(props) : surface3(props)};
    .Gear {
      display: inline;
    }
  }
`;
