import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

import { Routes } from "../../common/routes";

interface IProps extends RouteProps {
  isAuth: boolean;
  redirectUrl?: string;
}

const AuthRoute = ({ isAuth, redirectUrl = Routes.LOGIN, ...props }: IProps) =>
  isAuth ? <Route {...props} /> : <Redirect to={redirectUrl} />;

export default AuthRoute;
