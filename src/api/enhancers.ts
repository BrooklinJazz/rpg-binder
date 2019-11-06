import { graphql } from "@apollo/react-hoc";
import { CAMPAIGNS } from "./gqls";

export const withCampaigns = graphql(CAMPAIGNS);
