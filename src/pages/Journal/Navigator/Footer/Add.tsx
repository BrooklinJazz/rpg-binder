import React from "react";
import styled from "styled-components";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../../../../components/StyledIcon";
import { Text } from "../../../../components/StyledTypography";
import { ListItem } from "../ListItem";
import { surface3, hover } from "../../../../common/styles";

const Container = styled(ListItem)`
  & {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  background-color: ${surface3};
  &:hover {
    background-color: ${props => hover(surface3(props))};
  }
  * {
    margin-right: 10px;
  }
`;

export const Add = ({
  onClick,
  title
}: {
  onClick: () => void;
  title: string;
}) => {
  return (
    <Container onClick={onClick}>
      <Icon icon={faPlus} />
      <Text>{title}</Text>
    </Container>
  );
};
