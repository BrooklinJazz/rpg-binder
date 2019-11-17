import React from "react";
import styled from "styled-components";

import { capitalize, ProviderList } from "../../../common/helpers";
import {
  hover,
  navbarHeight,
  navbarZIndex,
  surface2
} from "../../../common/styles";
import ProviderIcon from "../../../components/ProviderIcon";
import { DefaultButton } from "../../../components/StyledButtons";
import { logoutAction } from "../../../context/auth/actions";
import { useAuthDispatch } from "../../../context/auth/store";

const DropdownWrapper = styled.div`
  position: absolute;
  top: ${navbarHeight};
  left: 0;
  z-index: ${navbarZIndex};
  height: max-content;
  width: 100vw;
`;

const Item = styled(DefaultButton)`
  text-align: left;
  background-color: ${surface2};
  width: 100%;
  &:hover {
    background-color: ${props => hover(surface2(props))};
  }
  * {
    margin: 0 20px;
  }
`;

const ItemWithoutIcon = styled(Item)`
  text-align: left;
  padding-left: 61px;
`;

export const MobileDropdown = ({ open }: { open: boolean }) => {
  const dispatch = useAuthDispatch();
  if (!open) {
    return null;
  }
  return (
    <DropdownWrapper>
      {ProviderList.map(provider => (
        <Item key={provider}>
          <ProviderIcon colored={true} provider={provider} />
          {capitalize(provider)}
        </Item>
      ))}
      <div onClick={() => dispatch(logoutAction())}>
        <ItemWithoutIcon>Sign Out</ItemWithoutIcon>
      </div>
    </DropdownWrapper>
  );
};
