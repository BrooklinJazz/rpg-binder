import React, { useState } from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { HoverIcon } from "./HoverIcon";
import { MobileDropdown } from "./MobileDropdown";
import { ThemeIcon } from "./ThemeIcon";

export const MobileContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <ThemeIcon />
      <div onClick={() => setMenuOpen(!menuOpen)}>
        <HoverIcon icon={faBars} />
      </div>
      <MobileDropdown open={menuOpen} />
    </>
  );
};
