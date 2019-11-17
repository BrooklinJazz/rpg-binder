import React, { useState } from "react";
import styled from "styled-components";

import { useCreateCampaign } from "../../api/hooks";
import { modalSpacing } from "../../common/styles";
import { PrimaryButton } from "../../components/StyledButtons";
import { Form } from "../../components/StyledForm";
import { Input } from "../../components/StyledInput";
import { Label } from "../../components/StyledLabel";
import { Modal } from "../../components/StyledModal";

const CreateButton = styled(PrimaryButton).attrs(props => ({
  children: "Create"
}))`
  margin-top: ${modalSpacing};
  align-self: flex-end;
`;

const CreateForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const CampaignModal = ({
  isOpen,
  close
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [name, setName] = useState("");
  const { create } = useCreateCampaign(close);
  if (!isOpen) {
    return null;
  }
  return (
    <Modal title="Create New Campaign" close={close}>
      <CreateForm onSubmit={() => create(name)}>
        <Label>
          Campaign Name
          <Input value={name} onChange={e => setName(e.target.value)} />
        </Label>
        <CreateButton />
      </CreateForm>
    </Modal>
  );
};
