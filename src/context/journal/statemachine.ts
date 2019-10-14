import { Machine, assign } from "xstate";
import { IJournalContext, IJournalStateSchema, IJournalActions } from "./types";

const initialContext = {
  selectedNpc: undefined,
  parentLocations: [],
  selectedLocation: undefined,
  selectedOrganization: undefined
};

export const journalMachine = Machine<IJournalContext, IJournalStateSchema, IJournalActions>(
  {
    id: "journalMachine",
    initial: "init",
    context: initialContext,
    on: {
      DISPLAY_NPCS: {
        target: "displayNpcs"
      },
      DISPLAY_LOCATIONS: {
        target: "displayLocations"
      },
      DISPLAY_ORGANIZATIONS: {
        target: "displayOrganizations"
      },
      SELECT_NPC: {
        target: "selectedNpc",
        actions: [
          assign({
            ...initialContext,
            parentLocations: (context) => context.parentLocations,
            selectedLocation: (context) => context.selectedLocation,
            selectedNpc: (_: any, event: any) => event.selectedNpc
          })
        ]
      },
      SELECT_ORGANIZATION: {
        target: "selectedOrganization",
        actions: [
          assign({
            ...initialContext,
            parentLocations: (context) => context.parentLocations,
            selectedLocation: (context) => context.selectedLocation,
            selectedOrganization: (_: any, event: any) =>
              event.selectedOrganization
          })
        ]
      },
      SELECT_LOCATION: {
        target: "selectedLocation",
        actions: [
          assign({
            ...initialContext,
            // set parent location if there was a previously selected location
            parentLocations: (
              { parentLocations: prevParents, selectedLocation: prevSelected }: any,
              _: any
            ) => prevSelected && [prevSelected, ...prevParents] || [],
            selectedLocation: (_: any, event: any) => event.selectedLocation
          })
        ]
      },
      BACK: {
        target: "displayLocations",
        actions: [
          assign({
            ...initialContext,
            selectedLocation: (context) => context.parentLocations[0],
            parentLocations: (context) =>
              context.parentLocations.filter(
                (_: any, index: number) => index > 0
              )
          })
        ],
        cond: "locationSelected"
      }
    },
    states: {
      init: {},
      displayNpcs: {},
      displayOrganizations: {},
      displayLocations: {},
      selectedNpc: {},
      selectedOrganization: {},
      selectedLocation: {}
    }
  },
  {
    guards: {
      locationSelected: (context: IJournalContext) => Boolean(context.selectedLocation)
    }
  }
);