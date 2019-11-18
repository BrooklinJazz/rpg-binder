import React, { useState } from "react";
import styled from "styled-components";

import { useUpdateOrCreateSection } from "../../../../api/hooks";
import { CreateButton } from "../../../../components/StyledButtons";
import { ModalForm } from "../../../../components/StyledForm";
import { Input } from "../../../../components/StyledInput";
import { Label } from "../../../../components/StyledLabel";;

export const SectionForm = () => {
  const [name, setName] = useState("");
  const { create, loading } = useUpdateOrCreateSection();
  const onSubmit = () => {
    create({ name });
  };
  return (
    <ModalForm loading={loading} onSubmit={onSubmit}>
      <Label>
        Section Name
        <Input value={name} onChange={e => setName(e.target.value)} />
      </Label>
      <CreateButton />
    </ModalForm>
  );
};
