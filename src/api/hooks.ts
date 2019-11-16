import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { LOGIN, SIGNUP } from "./gqls";
import { useAuthDispatch } from "../context/auth/store";
import { authRequestSuccess } from "../context/auth/actions";

interface ILoginResponse {
  login: { token: string };
}

interface ILoginInput {
  email: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useAuthDispatch();
  const [login] = useLazyQuery<ILoginResponse, ILoginInput>(LOGIN, {
    onCompleted: data =>
      dispatch(authRequestSuccess({ token: data.login.token }))
  });
  return (variables: { email: string; password: string }) =>
    login({ variables });
};

interface ISignupResponse {
  createUser: { token: string };
}

export const useSignup = () => {
  const dispatch = useAuthDispatch();
  const [signup] = useMutation<ISignupResponse, ILoginInput>(SIGNUP, {
    onCompleted: data =>
      dispatch(authRequestSuccess({ token: data.createUser.token }))
  });
  return (variables: { email: string; password: string }) =>
    signup({ variables });
};
