import React from "react";
import { useCampaignState } from "../../../../context/campaign/store";
import { useQuery } from "@apollo/react-hooks";
import { NPCS, ORGANIZATIONS, LOCATIONS } from "../../../../api/apollo";
import { useJournalMachine } from "../../../../context/journal";
import { JournalStates } from "../../../../context/journal/types";
import ListItem from "../ListItem";
import { DefaultButton } from "../../../../components/Button";

const NavigatorPages = () => {
  const { activeCampaign } = useCampaignState();
  const { context, state, actions } = useJournalMachine();
  const { data: npcsData } = useQuery<
    { npcs: { _id: string; name: string }[] },
    { campaignId: string; locationId?: string }
  >(NPCS, {
    variables: {
      campaignId: activeCampaign!,
      locationId: context.selectedLocation
    }
  });
  const { data: organizationsData } = useQuery<
    { organizations: { _id: string; name: string }[] },
    { campaignId: string; locationId?: string }
  >(ORGANIZATIONS, {
    variables: {
      campaignId: activeCampaign!,
      locationId: context.selectedLocation
    }
  });
  const { data: locationsData } = useQuery<
    { locations: { _id: string; name: string }[] },
    { campaignId: string; locationId?: string }
  >(LOCATIONS, {
    variables: {
      campaignId: activeCampaign!,
      locationId: context.selectedLocation
    }
  });
  const selectAction = (id: string) => {
    switch (state) {
      case JournalStates.displayLocations:
        return actions.selectLocation(id);
      case JournalStates.displayNpcs:
        return actions.selectNpc(id);
      case JournalStates.displayOrganizations:
        return actions.selectOrganization(id);
      default:
        throw new Error("selectAction called during invalid state: " + state);
    }
  };

  const isActive = (id: string) => {
    switch (state) {
      case JournalStates.selectedNpc:
        return context.selectedNpc === id;
      case JournalStates.selectedOrganization:
        return context.selectedOrganization === id;
      // this shouldn't happen but might trigger for a split second
      case JournalStates.selectedLocations:
        return context.selectedLocation === id;
      default:
        return false;
    }
  };

  const pageList = () => {
    switch (state) {
      case JournalStates.displayNpcs || JournalStates.selectedNpc:
        return npcsData && npcsData.npcs;
      case JournalStates.displayOrganizations ||
        JournalStates.selectedOrganization:
        return organizationsData && organizationsData.organizations;
      // when a location is selected pageList should be empty
      // I may want to change this behavior to make selecting between parent locations easier.
      case JournalStates.displayLocations:
        return locationsData && locationsData.locations;
      default:
        return [];
    }
  };
  return (
    <div className="NavigatorPages">
      <DefaultButton
        onClick={() =>
          console.log({ npcsData, organizationsData, locationsData, pageList: pageList() })
        }
      >
        log data
      </DefaultButton>
      {pageList() &&
        pageList()!.map(page => (
          <ListItem
            active={isActive(page._id)}
            onClick={() => selectAction(page._id)}
          >
            {page.name}
          </ListItem>
        ))}
    </div>
  );
};

export default NavigatorPages;
