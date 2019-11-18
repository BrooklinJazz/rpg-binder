import React from "react";
import styled from "styled-components";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { HoverableIcon } from "../../../../components/StyledIcon";

const BarsIcon = styled(HoverableIcon).attrs(_ => ({
  icon: faBars
}))`
  grid-area: menu-left;
`;

export const Bars = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick}>
      <BarsIcon />
    </div>
  );
};
