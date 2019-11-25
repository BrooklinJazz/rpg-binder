import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";

import { pollInterval, pinnedItemsPollInterval } from "../common/constants";
import { ICampaign, IPage, ISection } from "../common/types";
import { authRequestSuccess, logoutAction } from "../context/auth/actions";
import { useAuthDispatch, useAuthState } from "../context/auth/store";
import {
  closeModal,
  openModal,
  selectCampaign
} from "../context/campaign/actions";
import {
  useCampaignDispatch,
  useCampaignState
} from "../context/campaign/store";
import { useJournalModalState, useJournalState } from "../context/journal";
import {
  ADD_PIN,
  CAMPAIGN,
  CAMPAIGNS,
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  DELETE_PAGE,
  DELETE_SECTION,
  LOGIN,
  PAGE,
  REFRESH_TOKEN,
  REMOVE_PIN,
  SECTIONS,
  SESSION,
  SIGNUP,
  UPDATE_OR_CREATE_PAGE,
  UPDATE_OR_CREATE_SECTION,
  PAGES
} from "./gqls";
import { DataProxy } from "apollo-cache";

// TODO sort these based on context

interface IQueryRes {
  loading: boolean;
  error?: string;
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
    error: error && error.message
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
    error: error && error.message
  };
};

interface IRefreshTokenResponse {
  refreshToken: { token: string };
}

interface IRefreshTokenInput {
  token: string;
}

export const useRefreshToken = () => {
  const dispatch = useAuthDispatch();
  const { token } = useAuthState();
  const { loading, error } = useQuery<
    IRefreshTokenResponse,
    IRefreshTokenInput
  >(REFRESH_TOKEN, {
    onCompleted: data =>
      dispatch(authRequestSuccess({ token: data.refreshToken.token })),
    onError: () => dispatch(logoutAction()),
    pollInterval: 900000, // 15 minutes
    variables: { token: token! },
    skip: !token
  });
  return {
    loading,
    error: error && error.message
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
  return {
    loading,
    campaigns: data && data.campaigns,
    error: error && error.message
  };
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
  return {
    loading,
    campaign: data && data.campaign,
    error: error && error.message
  };
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
    error: error && error.message
  };
};

interface ISectionsResponse {
  sections?: ISection[];
}

interface IUseSections extends IQueryRes, ISectionsResponse {
  refetch: () => void;
}

export const useSections = (): IUseSections => {
  const { activeCampaign } = useCampaignState();
  const { data, loading, error, refetch } = useQuery<ISectionsResponse>(
    SECTIONS,
    {
      pollInterval,
      variables: { campaign: activeCampaign }
    }
  );
  return {
    loading,
    refetch,
    sections: Boolean(activeCampaign && data) ? data!.sections : [],
    error: error && error.message
  };
};

export const useSelectCampaign = () => {
  const dispatch = useCampaignDispatch();
  const select = (campaign: string | undefined) =>
    dispatch(selectCampaign({ campaign }));
  return select;
};

interface IPageResponse {
  page?: IPage;
}

interface IUsePage extends IQueryRes, IPageResponse {}

export const usePage = (): IUsePage => {
  const { page } = useJournalState();
  const { data, loading, error } = useQuery<IPageResponse>(PAGE, {
    // pollInterval,
    variables: { id: page }
  });
  return {
    loading,
    page: data && data.page,
    error: error && error.message
  };
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
  return {
    loading,
    pages: Boolean(section && data) ? data!.pages : [],
    error: error && error.message
  };
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
    error: error && error.message
  };
};

export const useUpdateOrCreatePage = () => {
  const { close } = useJournalModalState();
  const { section } = useJournalState();
  const { activeCampaign } = useCampaignState();
  const [create, { loading, error }] = useMutation<
    any,
    {
      name: string;
      campaign: string;
      id?: string;
      description?: string;
      section: string;
      relatedPages: string[];
    }
    // TODO close will not be necessary in the PageEditor, pass this value.
  >(UPDATE_OR_CREATE_PAGE, { onCompleted: close });
  return {
    create: ({
      name,
      id,
      description,
      relatedPages
    }: {
      name: string;
      id?: string;
      description?: string;
      relatedPages?: string[];
    }) =>
      create({
        // TODO implement page relationships
        variables: {
          name,
          campaign: activeCampaign!,
          id,
          description,
          section: section!,
          relatedPages: relatedPages || []
        }
      }),
    loading,
    error: error && error.message
  };
};

// TODO rename session to pinnedItems

interface IPinnedItem {
  section: ISection;
  pages: IPage[];
}

interface IPinnedItemsResponse {
  session: IPinnedItem[];
}
interface IUsePinnedItems extends IQueryRes {
  pinnedItems: IPinnedItem[];
}

export const usePinnedItems = (): IUsePinnedItems => {
  const { activeCampaign } = useCampaignState();
  const { data, loading, error } = useQuery<IPinnedItemsResponse>(SESSION, {
    pollInterval: pinnedItemsPollInterval,
    variables: { campaign: activeCampaign }
  });
  return {
    loading,
    pinnedItems: data ? data.session : [],
    error: error && error.message
  };
};

const useUpdatePin = () => {
  const { section } = useJournalState();
  const { activeCampaign } = useCampaignState();
  const variables = { section, campaign: activeCampaign };
  return (
    store: DataProxy,
    { data }: { data: { addSessionItem: string; removeSessionItem: string } }
  ) => {
    const pinnedPageId = data.addSessionItem || data.removeSessionItem;
    const pageData: { pages: IPage[] } | null = store.readQuery({
      query: PAGES,
      variables
    });
    const pages =
      pageData &&
      pageData.pages.map(page =>
        page._id === pinnedPageId
          ? { ...page, inSession: !page.inSession }
          : page
      );
    console.log(pages, pageData);
    store.writeQuery({ query: PAGES, variables, data: { pages } });
  };
};

export const usePinPage = () => {
  const update = useUpdatePin();
  const [add, { loading: addLoading }] = useMutation<any, { page: string }>(
    ADD_PIN,
    // @ts-ignore update fn uses more precise types, but they are accurate
    {
      update
    }
  );
  const [remove, { loading: removeLoading }] = useMutation<
    any,
    { page: string }
  >(
    REMOVE_PIN,
    // @ts-ignore update fn uses more precise types, but they are accurate
    {
      update
    }
  );
  return {
    loading: addLoading || removeLoading,
    add: (page: string) => add({ variables: { page } }),
    remove: (page: string) => remove({ variables: { page } })
  };
};

export const useDeleteSection = () => {
  const [deleteSection, { loading }] = useMutation<any, { id: string }>(
    DELETE_SECTION
  );
  return {
    loading,
    deleteSection: (id: string) => deleteSection({ variables: { id } })
  };
};

export const useDeletePage = () => {
  const [deletePage, { loading }] = useMutation<any, { id: string }>(
    DELETE_PAGE
  );
  return {
    loading,
    deletePage: (id: string) => deletePage({ variables: { id } })
  };
};

export const useDeleteCampaign = () => {
  const [sendDeleteRequest, { loading }] = useMutation<any, { id: string }>(
    DELETE_CAMPAIGN
  );

  const deleteCampaign = (id: string) => {
    sendDeleteRequest({ variables: { id } });
  };

  return {
    loading,
    deleteCampaign
  };
};

export const useCampaignModalActions = () => {
  const dispatch = useCampaignDispatch();
  const open = () => dispatch(openModal());
  const close = () => dispatch(closeModal());

  return {
    open,
    close
  };
};
