import React, { ReactNode } from "react";
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
import { Transition } from "react-transition-group";

const DropdownWrapper = styled.div`
  position: absolute;
  top: ${navbarHeight};
  left: 0;
  z-index: ${navbarZIndex};
  height: max-content;
  width: 100vw;
`;

const Scroll = styled.div`
  transition: 0.3s;
  max-height: ${({ state }: { state: string }) => {
    switch (state) {
      case "entering":
        return 0;
      case "entered":
        return "500px";
      case "exiting":
        return "500px";
      case "exited":
        return 0;
    }
  }};
  overflow: hidden;
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

const Animation = ({
  open,
  children
}: {
  open: boolean;
  children: ReactNode;
}) => {
  return (
    <Transition mountOnEnter in={open} timeout={0}>
      {state => <Scroll state={state}>{children}</Scroll>}
    </Transition>
  );
};

export const MobileDropdown = ({ open }: { open: boolean }) => {
  const dispatch = useAuthDispatch();
  return (
    <DropdownWrapper>
      <Animation open={open}>
        {ProviderList.map(provider => (
          <Item key={provider}>
            <ProviderIcon colored={true} provider={provider} />
            {capitalize(provider)}
          </Item>
        ))}
        <div onClick={() => dispatch(logoutAction())}>
          <ItemWithoutIcon>Sign Out</ItemWithoutIcon>
        </div>
      </Animation>
    </DropdownWrapper>
  );
};
