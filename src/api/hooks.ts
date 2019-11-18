import { ApolloError } from "apollo-boost";

import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";

import { pollInterval } from "../common/constants";
import { ICampaign, IPage, ISection } from "../common/types";
import { authRequestSuccess } from "../context/auth/actions";
import { useAuthDispatch } from "../context/auth/store";
import { closeModal } from "../context/campaign/actions";
import {
  useCampaignDispatch,
  useCampaignState
} from "../context/campaign/store";
import { useJournalState, useJournalModalState } from "../context/journal";
import {
  CAMPAIGN,
  CAMPAIGNS,
  CREATE_CAMPAIGN,
  LOGIN,
  PAGES,
  SECTIONS,
  SIGNUP,
  UPDATE_OR_CREATE_SECTION
} from "./gqls";

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
  const [login, { loading, error }] = useLazyQuery<ILoginResponse, ILoginInput>(
    LOGIN,
    {
      onCompleted: data =>
        dispatch(authRequestSuccess({ token: data.login.token }))
    }
  );
  return {
    login: (variables: { email: string; password: string }) =>
      login({ variables }),
    loading,
    error
  };
};

interface ISignupResponse {
  createUser: { token: string };
}

export const useSignup = () => {
  const dispatch = useAuthDispatch();
  const [signUp, { loading, error }] = useMutation<
    ISignupResponse,
    ILoginInput
  >(SIGNUP, {
    onCompleted: data =>
      dispatch(authRequestSuccess({ token: data.createUser.token }))
  });
  return {
    signUp: (variables: { email: string; password: string }) =>
      signUp({ variables }),
    loading,
    error
  };
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

export const useCreateCampaign = () => {
  const dispatch = useCampaignDispatch();
  const close = () => dispatch(closeModal());
  const [create, { loading, error }] = useMutation<any, { name: string }>(
    CREATE_CAMPAIGN,
    { onCompleted: close }
  );
  return {
    create: (name: string) => create({ variables: { name } }),
    loading,
    error
  };
};

interface ISectionsResponse {
  sections?: ISection[];
}

interface IUseSections extends IQueryRes, ISectionsResponse {}

export const useSections = (): IUseSections => {
  const { activeCampaign } = useCampaignState();
  const { data, loading, error } = useQuery<ISectionsResponse>(SECTIONS, {
    pollInterval,
    variables: { campaign: activeCampaign }
  });
  return { loading, sections: data && data.sections, error };
};

interface IPagesResponse {
  pages?: IPage[];
}

interface IUsePages extends IQueryRes, IPagesResponse {}

export const usePages = (): IUsePages => {
  const { activeCampaign } = useCampaignState();
  const { section } = useJournalState();
  const { data, loading, error } = useQuery<IPagesResponse>(PAGES, {
    pollInterval,
    // NOTE this may cause issues with pollInterval
    skip: !section,
    variables: { campaign: activeCampaign, section }
  });
  return { loading, pages: data && data.pages, error };
};

export const useUpdateOrCreateSection = () => {
  const { close } = useJournalModalState();
  const { activeCampaign } = useCampaignState();
  const [create, { loading, error }] = useMutation<
    any,
    { name: string; campaign: string; id?: string }
  >(UPDATE_OR_CREATE_SECTION, { onCompleted: close });
  return {
    create: ({ name, id }: { name: string; id?: string }) =>
      create({ variables: { name, campaign: activeCampaign!, id } }),
    loading,
    error
  };
};
