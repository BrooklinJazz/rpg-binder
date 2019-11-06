import "./CampaignModal.scss";

import React, { useState } from "react";

import { PrimaryButton } from "../../../components/Button";
import Label from "../../../components/Inputs/Label";
import TextInput from "../../../components/Inputs/TextInput";
import Modal from "../../../components/Modal";
import { H1 } from "../../../components/Typeography";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CAMPAIGN } from "../../../api/gqls";
import Form from "../../../components/Inputs/Form";

interface IProps {
  close: () => void;
}

const CampaignModal = ({ close }: IProps) => {
  const [create, { loading, error }] = useMutation<any, { name: string }>(
    CREATE_CAMPAIGN,
    { onCompleted: close }
  );
  const [name, setName] = useState("");
  return (
    <Modal close={close} className="CampaignModal">
      <Form
        isLoading={loading}
        onSubmit={() => create({ variables: { name } })}
        error={error && error.message}
      >
        <H1 fontWeight="light" elementStyle="H3">
          Create Campaign
        </H1>
        <Label label="Name" htmlFor="CampaignModalName">
          <TextInput
            value={name}
            onChange={e => setName(e.target.value)}
            id="CampaignModalName"
          />
        </Label>
        <PrimaryButton className="CampaignModalButton">
          Create Campaign
        </PrimaryButton>
      </Form>
    </Modal>
  );
};

export default CampaignModal;
