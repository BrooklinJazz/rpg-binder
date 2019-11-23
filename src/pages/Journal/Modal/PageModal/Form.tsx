import React, { useState } from "react";
import styled from "styled-components";

import { useUpdateOrCreatePage } from "../../../../api/hooks";
import { CreateButton } from "../../../../components/StyledButtons";
import { ModalForm } from "../../../../components/StyledForm";
import { Input } from "../../../../components/StyledInput";
import { Label } from "../../../../components/StyledLabel";
import { PAGE_NAME_LENGTH } from "../../../../common/constants";

export const PageForm = () => {
  const [name, setName] = useState("");
  const { create, loading, error } = useUpdateOrCreatePage();
  const onSubmit = () => {
    create({ name });
  };
  return (
    <ModalForm error={error} loading={loading} onSubmit={onSubmit}>
      <Label>
        Page Name
        <Input
          maxLength={PAGE_NAME_LENGTH}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Label>
      <CreateButton />
    </ModalForm>
  );
};
