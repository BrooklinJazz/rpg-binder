import { ApolloError } from "apollo-boost";

import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";

import { pollInterval } from "../common/constants";
import { ICampaign } from "../common/types";
import { authRequestSuccess } from "../context/auth/actions";
import { useAuthDispatch } from "../context/auth/store";
import { useCampaignState } from "../context/campaign/store";
import { CAMPAIGN, CAMPAIGNS, CREATE_CAMPAIGN, LOGIN, SIGNUP } from "./gqls";

interface IQueryRes {
  loading: boolean;
  error?: ApolloError;
}

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

interface ICampaignsResponse {
  campaigns?: ICampaign[];
}

interface IUseCampaigns extends ICampaignsResponse, IQueryRes {}

export const useCampaigns = (): IUseCampaigns => {
  const { data, loading, error } = useQuery<ICampaignsResponse>(CAMPAIGNS, {
    pollInterval
  });
  return { loading, campaigns: data && data.campaigns, error };
};

interface ICampaignResponse {
  campaign?: ICampaign;
}

interface IUseCampaign extends IQueryRes, ICampaignResponse {}

export const useCampaign = (): IUseCampaign => {
  const { activeCampaign } = useCampaignState();
  const { data, loading, error } = useQuery<
    ICampaignResponse,
    { campaignId: string }
  >(CAMPAIGN, { variables: { campaignId: activeCampaign! } });
  return { loading, campaign: data && data.campaign, error };
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
