import styled from "styled-components";

import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Gear = styled(FontAwesomeIcon).attrs(props => ({
  icon: faCog
}))`
  min-width: 20px;
  margin-right: 8px;
`;

export default Gear;
