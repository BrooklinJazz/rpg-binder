import combineClasses from "combine-classes/lib";
import React from "react";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Theme } from "../../../common/theme";
import { setTheme } from "../../../context/theme/actions";
import { useThemeDispatch, useThemeState } from "../../../context/theme/store";

const ThemeIcon = ({ className }: { className?: string }) => {
  const themeDispatch = useThemeDispatch();
  const { theme } = useThemeState();

  const toggleTheme = () => {
    themeDispatch(
      setTheme({
        theme: theme === "theme-light" ? "theme-dark" : "theme-light"
      })
    );
  };

  const themeIcon = theme === "theme-dark" ? faSun : faMoon;
  return (
    <div className={className} role="button" onClick={toggleTheme}>
      <FontAwesomeIcon
        className={combineClasses(
          Theme.onPrimary,
          Theme.hoverable,
          "JournalNavbarSpacing"
        )}
        icon={themeIcon}
      />
    </div>
  );
};

export default ThemeIcon;
