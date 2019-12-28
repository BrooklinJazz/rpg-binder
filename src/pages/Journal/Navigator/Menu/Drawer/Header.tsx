import styled from "styled-components";

import { surface5 } from "../../../../../common/styles";
import { Text } from "../../../../../components/StyledTypography";

export const CampaignHeader = styled(Text)`
  grid-area: campaign-header;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${surface5};
`;
