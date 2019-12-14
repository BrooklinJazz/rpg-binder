import styled from "styled-components";

import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hover, onSurface, onSurfaceHover } from "../../common/styles";

const Gear = styled(FontAwesomeIcon).attrs(props => ({
  icon: faCog
}))`
  min-width: 20px;
  color: ${onSurface};
  &:hover {
    color: ${onSurfaceHover};
  }
`;

export default Gear;
