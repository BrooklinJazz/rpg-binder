import React from "react";
import { useCampaignState } from "../../../../context/campaign/store";
import { useQuery } from "@apollo/react-hooks";
import { NPCS, ORGANIZATIONS, LOCATIONS } from "../../../../api/apollo";
import { useJournalMachine } from "../../../../context/journal";
import { JournalStates } from "../../../../context/journal/types";
import ListItem from "../ListItem";
import Load from "../../../../components/Load";
import combineClasses from "combine-classes/lib";
import { Theme } from "../../../../common/theme";
import "./Pages.scss";
import Loading from "../../../../components/Loading";
import Fade from "../../../../components/Fade";

const NavigatorPages = () => {
  const { activeCampaign } = useCampaignState();
  const { context, state, actions } = useJournalMachine();
  const { loading: npcsLoading, data: npcsData } = useQuery<
    { npcs: { _id: string; name: string }[] },
    { campaignId: string; locationId?: string }
  >(NPCS, {
    variables: {
      campaignId: activeCampaign!,
      locationId: context.selectedLocation
    },
    pollInterval: 6000
  });
  const { loading: organizationsLoading, data: organizationsData } = useQuery<
    { organizations: { _id: string; name: string }[] },
    { campaignId: string; locationId?: string }
  >(ORGANIZATIONS, {
    variables: {
      campaignId: activeCampaign!,
      locationId: context.selectedLocation
    },
    pollInterval: 6000
  });
  const { loading: locationsLoading, data: locationsData } = useQuery<
    { locations: { _id: string; name: string }[] },
    { campaignId: string; locationId?: string }
  >(LOCATIONS, {
    variables: {
      campaignId: activeCampaign!,
      locationId: context.selectedLocation
    },
    pollInterval: 6000
  });
  const selectAction = (id: string) => {
    switch (state) {
      case JournalStates.displayLocations:
        return actions.selectLocation(id);
      case JournalStates.displayNpcs:
      case JournalStates.selectedNpc:
        return actions.selectNpc(id);
      case JournalStates.displayOrganizations:
      case JournalStates.selectedOrganization:
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
      case JournalStates.selectedLocation:
        return context.selectedLocation === id;
      default:
        return false;
    }
  };

  const pageList = () => {
    switch (state) {
      // NPCS
      case JournalStates.displayNpcs:
      case JournalStates.selectedNpc:
        return npcsData && npcsData.npcs;
      case JournalStates.displayOrganizations:
      case JournalStates.selectedOrganization:
        return organizationsData && organizationsData.organizations;
      // when a location is selected pageList should be empty
      // I may want to change this behavior to make selecting between parent locations easier.
      case JournalStates.displayLocations:
        return locationsData && locationsData.locations;
      default:
        return [];
    }
  };

  const isLoading = () => {
    switch (state) {
      // NPCS
      case JournalStates.displayNpcs:
      case JournalStates.selectedNpc:
        return npcsLoading;
      case JournalStates.displayOrganizations:
      case JournalStates.selectedOrganization:
        return organizationsLoading;
      case JournalStates.displayLocations:
      case JournalStates.selectedLocation:
        return locationsLoading;
      // handles init
      default:
        return false;
    }
  };
  const pageItems =
    pageList() &&
    pageList()!.map(page => (
      <ListItem
        key={page._id}
        active={isActive(page._id)}
        onClick={() => selectAction(page._id)}
      >
        {page.name}
      </ListItem>
    ));
  const loading = isLoading();
  return (
    <div className="NavigatorPages">
      {loading && (
        <div className={combineClasses("NavigatorText", Theme.onDefault)}>
          <Loading />
        </div>
      )}
      <Fade in={Boolean(pageItems && pageItems.length && !loading)}>
        <>{pageItems}</>
      </Fade>
      {!loading && pageItems && pageItems.length === 0 && (
        <div className={combineClasses("NavigatorText", Theme.onDefault)}>
          {state === JournalStates.init ||
          state === JournalStates.selectedLocation
            ? "No section selected yet!"
            : "Nothing here!"}
        </div>
      )}
    </div>
  );
};

export default NavigatorPages;
