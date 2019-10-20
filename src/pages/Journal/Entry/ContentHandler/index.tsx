import React from "react";
import { useJournalMachine } from "../../../../context/journal";
import LocationEntry from "../Location";
import NpcEntry from "../Npc";
import OrganizationEntry from "../Organization";
import { GridTemplateAreas } from "../../../../common/constants";

const ContentHandler = () => {
  const { context } = useJournalMachine();
  const heading = () => {
    if (context.selectedNpc) {
      return context.selectedNpc.name;
    } else if (context.selectedOrganization) {
      return context.selectedOrganization.name;
    } else if (context.selectedLocation) {
      return context.selectedLocation.name;
    }
  };
  const content = () => {
    if (context.selectedNpc) {
      return <NpcEntry id={context.selectedNpc.id} />;
    } else if (context.selectedOrganization) {
      return <OrganizationEntry id={context.selectedOrganization.id} />;
    } else if (context.selectedLocation) {
      // location & another entry can be selected so location must go last
      //  (with the present state machine)
      // NOTE this may be refactored with the new navigator implementation
      return <LocationEntry id={context.selectedLocation.id} />;
    }
    return null;
  };
  return (
    <>
      <div className={GridTemplateAreas.ENTRY_HEADING}>{heading()}</div>
      {content()}
    </>
  );
};

export default ContentHandler;
