import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { hover, primary1, surface1 } from "../../common/styles";

const Pin = styled(FontAwesomeIcon).attrs(props => ({
  icon: faThumbtack
}))`
  min-width: 20px;
  margin: 0;
  color: ${(props: { checked: boolean }) =>
    props.checked ? primary1(props) : surface1(props)};
  &:hover {
    color: ${props =>
      props.checked ? hover(primary1(props)) : hover(surface1(props))};
  }
`;

export default Pin;
