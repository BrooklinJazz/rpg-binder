import {
  IAuthSuccessAction,
  ILogoutAction,
} from "./types";

export const authRequestSuccess = (
  payload: IAuthSuccessAction["payload"]
): IAuthSuccessAction => ({
  type: "auth_success",
  payload
});

export const logoutAction = (): ILogoutAction => ({
  type: "logout"
});
