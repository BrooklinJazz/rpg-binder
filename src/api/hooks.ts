import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";

import { pollInterval } from "../common/constants";
import { ICampaign } from "../common/types";
import { authRequestSuccess } from "../context/auth/actions";
import { useAuthDispatch } from "../context/auth/store";
import { CAMPAIGNS, CREATE_CAMPAIGN, LOGIN, SIGNUP } from "./gqls";

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

interface ICampaignResponse {
  campaigns: ICampaign[];
}

export const useCampaigns = () => {
  const { data, loading } = useQuery<ICampaignResponse>(CAMPAIGNS, {
    pollInterval
  });
  return { loading, campaigns: data && data.campaigns };
};

export const useCreateCampaign = (closeModal: () => void) => {
  const [create, { loading, error }] = useMutation<any, { name: string }>(
    CREATE_CAMPAIGN,
    { onCompleted: closeModal }
  );
  return {
    create: (name: string) => create({ variables: { name } }),
    loading,
    error
  };
};
