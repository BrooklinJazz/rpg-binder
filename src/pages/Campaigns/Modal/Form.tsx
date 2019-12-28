import React, { useState } from "react";

import { useCreateCampaign } from "../../../api/hooks";
import { CreateButton } from "../../../components/StyledButtons";
import { ModalForm } from "../../../components/StyledForm";
import { Input } from "../../../components/StyledInput";
import { Label } from "../../../components/StyledLabel";

export const CampaignForm = () => {
  const [name, setName] = useState("");
  const { create, loading, error } = useCreateCampaign();
  return (
    <ModalForm loading={loading} error={error} onSubmit={() => create(name)}>
      <Label>
        Campaign Name
        <Input autoFocus value={name} onChange={e => setName(e.target.value)} />
      </Label>
      <CreateButton />
    </ModalForm>
  );
};
