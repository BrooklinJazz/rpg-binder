import React, { useState } from "react";

import { useUpdateOrCreateSection } from "../../../../api/hooks";
import { SECTION_NAME_LENGTH } from "../../../../common/constants";
import { CreateButton } from "../../../../components/StyledButtons";
import { ModalForm } from "../../../../components/StyledForm";
import { Input } from "../../../../components/StyledInput";
import { Label } from "../../../../components/StyledLabel";

export const SectionForm = () => {
  const [name, setName] = useState("");
  const { create, loading, error } = useUpdateOrCreateSection();
  const onSubmit = () => {
    create({ name });
  };
  return (
    <ModalForm error={error} loading={loading} onSubmit={onSubmit}>
      <Label>
        Section Name
        <Input
          autoFocus
          maxLength={SECTION_NAME_LENGTH}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Label>
      <CreateButton />
    </ModalForm>
  );
};
