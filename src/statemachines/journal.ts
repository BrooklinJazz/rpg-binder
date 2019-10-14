import { Machine, assign } from "xstate";

const initialContext = {
  selectedNpc: undefined,
  parentLocations: [],
  selectedLocation: undefined,
  selectedOrganization: undefined
};

export const journalMachine = Machine(
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
            selectedNpc: (_: any, event: any) => event.selectedNpc
          })
        ]
      },
      SELECT_ORGANIZATION: {
        target: "selectedOrganization",
        actions: [
          assign({
            ...initialContext,
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
            selectedLocation: (_: any, event: any) => event.selectedLocation
          })
        ]
      },
      DISPLAY_LOCATION_NPCS: {
        target: "selectedLocation.displayNpcs",
        cond: "locationSelected"
      },
      DISPLAY_LOCATION_LOCATIONS: {
        target: "selectedLocation.displayLocations",
        cond: "locationSelected"
      },
      DISPLAY_LOCATION_ORGANIZATIONS: {
        target: "selectedLocation.displayOrganizations",
        cond: "locationSelected"
      },
      SELECT_LOCATION_NPC: {
        target: "selectedLocation.selectedNpc",
        actions: [
          assign({ selectedNpc: (_: any, event: any) => event.selectedNpc })
        ]
      },
      SELECT_LOCATION_ORGANIZATION: {
        target: "selectedLocation.selectedOrganization",
        actions: [
          assign({
            selectedOrganization: (_: any, event: any) =>
              event.selectedOrganization
          })
        ]
      },
      // I could probably have a single SELECT_LOCATION action
      SELECT_LOCATION_LOCATION: {
        target: "selectedLocation",
        actions: [
          assign({
            ...initialContext,
            parentLocations: (
              { parentLocations, selectedLocation }: any,
              _: any
            ) => [selectedLocation, ...parentLocations],
            selectedLocation: (context: any, event: any) =>
              event.selectedLocation
          })
        ]
      },
      BACK: {
        target: "displayLocations",
        actions: [
          assign({
            ...initialContext
          })
        ],
        cond: "locationSelected"
      },
      BACK_TO_PARENT_LOCATION: {
        target: "selectedLocation",
        actions: [
          assign({
            selectedLocation: (context: any) => context.parentLocations[0],
            parentLocations: (context: any) =>
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
      selectedLocation: {
        initial: "init",
        states: {
          init: {},
          displayNpcs: {},
          displayLocations: {},
          displayOrganizations: {},
          selectedNpc: {},
          selectedOrganization: {}
        }
      }
    }
  },
  {
    guards: {
      locationSelected: (context: any) => Boolean(context.selectedLocation)
    }
  }
);

  // const CampaignStateContext = createContext<ICampaignState | undefined>(
  //   undefined
  // );
