import React, { useState } from "react";
import { DefaultButton } from "./components/Button";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("theme-light");
  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };
  return (
    <div className={theme}>
      <DefaultButton onClick={toggleTheme} className="ThemeToggle">
        Toggle Theme
      </DefaultButton>
      {children}
    </div>
  );
};
