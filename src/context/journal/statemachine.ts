import { Machine, assign } from "xstate";
import { IJournalContext, IJournalStateSchema, IJournalActions } from "./types";

const initialContext = {
  selectedNpc: undefined,
  parentLocations: [],
  selectedLocation: undefined,
  selectedOrganization: undefined
};

export const journalMachine = Machine<
  IJournalContext,
  IJournalStateSchema,
  IJournalActions
>(
  {
    id: "journalMachine",
    initial: "init",
    context: initialContext,
    // @ts-ignore
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
      CHANGE_CAMPAIGN: {
        target: "init",
        actions: [assign(initialContext)]
      },
      SELECT_NPC: {
        target: "selectedNpc",
        actions: [
          assign({
            ...initialContext,
            parentLocations: (context: IJournalContext) =>
              context.parentLocations,
            selectedLocation: (context: IJournalContext) =>
              context.selectedLocation,
            selectedNpc: (_: any, event: any) => event.selectedNpc
          })
        ]
      },
      SELECT_ORGANIZATION: {
        target: "selectedOrganization",
        actions: [
          assign({
            ...initialContext,
            parentLocations: (context: IJournalContext) =>
              context.parentLocations,
            selectedLocation: (context: IJournalContext) =>
              context.selectedLocation,
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
              {
                parentLocations: prevParents,
                selectedLocation: prevSelected
              }: any,
              _: any
            ) => (prevSelected && [prevSelected, ...prevParents]) || [],
            selectedLocation: (_: any, event: any) => event.selectedLocation
          })
        ]
      },
      BACK: {
        target: "displayLocations",
        actions: [
          assign({
            ...initialContext,
            selectedLocation: (context: IJournalContext) =>
              context.parentLocations[0],
            parentLocations: (context: IJournalContext) =>
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
      locationSelected: (context: IJournalContext) =>
        Boolean(context.selectedLocation)
    }
  }
);
