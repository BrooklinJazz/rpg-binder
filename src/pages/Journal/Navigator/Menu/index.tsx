import React, { useState } from "react";
import styled from "styled-components";

import { navbarPadding, surface4 } from "../../../../common/styles";
import { Bars } from "./Bars";
import { Drawer } from "./Drawer/index";
import { Header } from "./Header";
import { Search } from "./Search";

export const Grid = styled.div`
  grid-area: menu;
  background-color: ${surface4};
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
