import jwt from "jsonwebtoken";
import { createSelector } from "reselect";

import { IDecodedToken } from "../../common/types";
import { IAuthState } from "./types";

export const selectAuthToken = (state: IAuthState) => state.token;

export const selectIsLoggedIn = createSelector(
  selectAuthToken,
  token => {
    if (token) {
      const decodedToken = jwt.decode(token);
      return Boolean((decodedToken as IDecodedToken).exp > 0);
    }
    return false;
  }
);
