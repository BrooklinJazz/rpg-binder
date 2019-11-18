import React from "react";
import styled from "styled-components";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { HoverableIcon } from "../../../../components/StyledIcon";

const Container = styled.div`
  margin-left: auto;
`;

const SearchIcon = styled(HoverableIcon).attrs(_ => ({
  icon: faSearch
}))``;

export const Search = () => {
  return (
    <Container>
      <SearchIcon />
    </Container>
  );
};
