import React, { useState } from "react";
import styled from "styled-components";

import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

import { useCampaign } from "../../../../api/hooks";
import { navbarPadding, surface2 } from "../../../../common/styles";
import { HoverableIcon } from "../../../../components/StyledIcon";
import { Text } from "../../../../components/StyledTypography";
import { Drawer } from "./Drawer/index";
import { Header } from "./Header";
import { Search } from "./Search";
import { Bars } from "./Bars";

export const Grid = styled.div`
  grid-area: menu;
  background-color: ${surface2};
  display: grid;
  grid-template-areas: "menu-left menu-center menu-right";
  grid-template-columns: "1fr 1fr 1fr";
  grid-template-rows: 1fr;
  align-items: center;
  padding: 0 ${navbarPadding};
`;

export const Menu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleOpenDrawer = () => setOpenDrawer(!openDrawer);
  return (
    <>
      <Drawer open={openDrawer} />
      <Grid>
        <Bars onClick={toggleOpenDrawer} />
        <Header />
        <Search />
      </Grid>
    </>
  );
};
