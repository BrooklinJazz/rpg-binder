import React from "react";
import ListItem from "../ListItem";
import { useJournalMachine } from "../../../../context/journal";
import { JournalStates } from "../../../../context/journal/types";

const NavigatorSections = () => {
  const { state, actions } = useJournalMachine();
  return (
    <div className="NavigatorSections">
      <ListItem
        onClick={() => actions.displayNpcs()}
        active={
          state === JournalStates.displayNpcs ||
          state === JournalStates.selectedNpc
        }
      >
        Npcs
      </ListItem>
      <ListItem
        onClick={() => actions.displayOrganizations()}
        active={
          state === JournalStates.displayOrganizations ||
          state === JournalStates.selectedOrganization
        }
      >
        Organizations
      </ListItem>
      <ListItem
        onClick={() => actions.displayLocations()}
        active={state === JournalStates.displayLocations}
      >
        Locations
      </ListItem>
    </div>
  );
};

export default NavigatorSections;
