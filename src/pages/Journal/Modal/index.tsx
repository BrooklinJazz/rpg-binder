import React from "react";
import { useJournalModalState } from "../../../context/journal";
import { Handler } from "./Handler";

export const JournalModal = () => {
  const { isOpen } = useJournalModalState();
  return (isOpen && <Handler />) || null;
};
