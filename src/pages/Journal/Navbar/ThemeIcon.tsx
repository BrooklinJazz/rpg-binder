import React from "react";

import { faCloudSun, faSun } from "@fortawesome/free-solid-svg-icons";

import { toggleTheme } from "../../../context/theme/actions";
import { useThemeDispatch, useThemeState } from "../../../context/theme/store";
import { Theme } from "../../../context/theme/types";
import { HoverIcon } from "./HoverIcon";

export const ThemeIcon = () => {
  const dispatch = useThemeDispatch();
  const { theme } = useThemeState();
  return (
    <div
      // TODO Extract this style
      style={{ marginRight: "auto", marginLeft: "auto" }}
      role="button"
      onClick={() => dispatch(toggleTheme())}
    >
      <HoverIcon icon={theme === Theme.LIGHT ? faCloudSun : faSun} />
    </div>
  );
};
