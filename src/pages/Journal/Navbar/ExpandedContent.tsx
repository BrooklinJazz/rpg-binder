import React from "react";
import styled from "styled-components";

import { propsFromProvider, ProviderList } from "../../../common/helpers";
import { onPrimary, onPrimaryHover } from "../../../common/styles";
import BaseProviderIcon from "../../../components/ProviderIcon";
import { Button } from "../../../components/StyledButtons";
import { ThemeIcon } from "./ThemeIcon";
import { useAuth0 } from "../../../react-auth0-spa";

const SignOut = styled(Button).attrs(props => ({
  children: "Sign Out"
}))`
  background-color: transparent;
  color: ${onPrimary};
  &:hover {
    color: ${onPrimaryHover};
  }
`;

const ProviderIcon = styled(BaseProviderIcon)`
  & {
    color: ${onPrimary};
    margin: 0 5px;
  }
`;

const ProviderIconWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
`;

const ProviderIcons = () => {
  return (
    <ProviderIconWrapper>
      {ProviderList.map(provider => (
        <a
          key={provider}
          href={propsFromProvider(provider).url}
          target="_blank"
        >
          <ProviderIcon provider={provider} />
        </a>
      ))}
    </ProviderIconWrapper>
  );
};

export const ExpandedContent = () => {
  const {logout} = useAuth0();
  return (
    <>
      <ThemeIcon />
      <ProviderIcons />
      <SignOut onClick={logout} />
    </>
  );
};
