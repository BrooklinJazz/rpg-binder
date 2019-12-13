import styled from "styled-components";

import { hover, surface2, surface3 } from "../../../common/styles";
import { DefaultButton } from "../../../components/StyledButtons";

export const ListItem = styled(DefaultButton)`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: left;
  padding-left: 10px;
  background-color: ${(props: { active?: boolean }) =>
    props.active ? hover(surface3(props)) : surface2(props)};
  margin-bottom: 2px;
  &:hover {
    background-color: ${props =>
      props.active ? hover(surface3(props)) : hover(surface2(props))};
  }
`;
