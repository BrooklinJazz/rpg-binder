import React, {
  createContext,
  ReactElement
} from "react";
import { useQuery } from "@apollo/react-hooks";
import { CAMPAIGNS } from "./gqls";

const CampaignsAPIContext = createContext<{} | undefined>(undefined);

export const withCampaigns = ({
  children
}: {
  children: ReactElement<any>;
}) => {
  const { loading, data, error } = useQuery(CAMPAIGNS);
  return (
    <CampaignsAPIContext.Provider value={data}>
      {React.cloneElement(children, { context: data })}
    </CampaignsAPIContext.Provider>
  );
};
