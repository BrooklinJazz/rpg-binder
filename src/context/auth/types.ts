export interface IAuthState {
  token?: string;
}

export type AuthAction = IAuthSuccessAction | ILogoutAction;

export type AuthDispatch = (action: AuthAction) => void;

export interface ILogoutAction {
  type: "logout";
}
export interface IAuthSuccessAction {
  type: "auth_success";
  payload: { token: string };
}
