import React, { useEffect } from "react";

import { useLazyQuery, useQuery } from "@apollo/react-hooks";

import { LOGIN } from "./api/apollo";
import { logoutAction, authRequestSuccess } from "./context/auth/actions";
import { useAuthDispatch, useAuthState } from "./context/auth/store";
import { setTheme } from "./context/theme/actions";
import { useThemeDispatch, useThemeState } from "./context/theme/store";

const DevComponents = () => {
  const authDispatch = useAuthDispatch();
  const themeDispatch = useThemeDispatch();
  const { data } = useQuery<
    { login: { token: string } },
    { email: string; password: string }
  >(LOGIN, { variables: { email: "test@test.com", password: "test" } });
  const { theme } = useThemeState();
  const toggleTheme = () => {
    themeDispatch(
      setTheme({
        theme: theme === "theme-light" ? "theme-dark" : "theme-light"
      })
    );
  };
  return (
    <div className="DevComponents">
      <button onClick={() => authDispatch(logoutAction())}>Logout</button>
      <button
        onClick={() =>
          data && authDispatch(authRequestSuccess({ token: data.login.token }))
        }
      >
        Auto Login
      </button>
      <button onClick={toggleTheme} className="ThemeToggle">
        Toggle Theme
      </button>
    </div>
  );
};

export default DevComponents;
