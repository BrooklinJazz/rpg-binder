import { Machine, assign, EventObject } from "xstate";
import { useMachine } from "@xstate/react";
import React, { useState } from "react";
import { DefaultButton } from "./components/Button";

// interface JournalStateSchema {
//   states: {
//     init: {};
//     displayNpcs: {
//       states: {
//         listing: {};
//         selectedNpc: {};
//       };
//     };
//     displayOrganizations: {
//       states: {
//         listing: {};
//         selectedOrganization: {};
//       };
//     };
//     displayLocations: {
//       states: {
//         displayLocations: {};
//         activeLocation: {
//           // TODO implement advanced location states
//           // states: {
//           //     displayLocationNpcs: {},
//           //     displayLocationOrganizations: {},
//           //     displayLocationLocations: {},
//           // }
//         };
//       };
//     };
//   };
// }

// enum JournalEvents {
//   DISPLAY_NPCS = "DISPLAY_NPCS",
//   SELECT_NPC = "SELECT_NPC",
//   DISPLAY_ORGANIZATIONS = "DISPLAY_ORGANIZATIONS",
//   SELECT_ORGANIZATION = "SELECT_ORGANIZATION",
//   DISPLAY_LOCATIONS = "DISPLAY_LOCATIONS",
//   SELECT_LOCATION = "SELECT_LOCATION"
// }

// interface IDisplayNpcs extends EventObject {
//   type: JournalEvents.DISPLAY_NPCS;
// }
// interface ISelectNpc extends EventObject {
//   type: JournalEvents.SELECT_NPC;
//   selectedNpc: string;
// }
// interface IDisplayOrganizations extends EventObject {
//   type: JournalEvents.DISPLAY_ORGANIZATIONS;
// }
// interface ISelectOrganization extends EventObject {
//   type: JournalEvents.SELECT_ORGANIZATION;
//   selectedOrganization: string;
// }
// interface IDisplayLocations extends EventObject {
//   type: JournalEvents.DISPLAY_LOCATIONS;
// }
// interface ISelectLocation extends EventObject {
//   type: JournalEvents.SELECT_LOCATION;
//   selectedLocation: string;
// }

// type JournalEvent =
//   | IDisplayNpcs
//   | ISelectNpc
//   | IDisplayOrganizations
//   | ISelectOrganization
//   | IDisplayLocations
//   | ISelectLocation;

// interface IJournalContext {
//   selectedNpc: undefined | string,
//   parentLocations: string[],
//   selectedLocation: undefined | string,
//   selectedOrganization: undefined | string
// }

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

export function Test() {
  const [current, send] = useMachine(journalMachine);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>STATE: {JSON.stringify(current.value)}</div>
        <div>
          SELECTED PARENT LOCATIONS:{" "}
          {current.context.parentLocations.toString()}
        </div>
        <div>SELECTED ORGANIZATION: {current.context.selectedOrganization}</div>
        <div>SELECTED NPC: {current.context.selectedNpc}</div>
        <div>SELECTED LOCATION: {current.context.selectedLocation}</div>
      </div>
      <div style={{ display: "flex", height: 200 }}>
        <button onClick={() => send("DISPLAY_NPCS")}>DISPLAY NPC</button>
        <button onClick={() => send("DISPLAY_ORGANIZATIONS")}>
          DISPLAY ORGANIZATIONS
        </button>
        <button onClick={() => send("DISPLAY_LOCATIONS")}>
          DISPLAY LOCATIONS
        </button>
      </div>
      <div style={{ display: "flex", height: 200 }}>
        <button
          onClick={() =>
            send("SELECT_NPC", { selectedNpc: "my example npc id" })
          }
        >
          SELECT NPC
        </button>
        <button
          onClick={() =>
            send("SELECT_LOCATION", {
              selectedLocation: "my example location id"
            })
          }
        >
          SELECT LOCATION
        </button>
        <button
          onClick={() =>
            send("SELECT_ORGANIZATION", {
              selectedOrganization: "my example organization id"
            })
          }
        >
          SELECT ORGANIZATION
        </button>
      </div>
      <div style={{ display: "flex", height: 200 }}>
        <button
          onClick={() =>
            send("DISPLAY_LOCATION_NPCS", {
              //   selectedNpc: "my example location npc id"
            })
          }
        >
          DISPLAY LOCATION NPCS
        </button>
        <button
          onClick={() =>
            send("DISPLAY_LOCATION_ORGANIZATIONS", {
              //   selectedNpc: "my example location npc id"
            })
          }
        >
          DISPLAY LOCATION ORGANIZATIONS
        </button>
        <button
          onClick={() =>
            send("DISPLAY_LOCATION_LOCATIONS", {
              //   selectedNpc: "my example location npc id"
            })
          }
        >
          DISPLAY LOCATION LOCATIONS
        </button>
      </div>
      <div style={{ display: "flex", height: 200 }}>
        <button
          onClick={() =>
            send("SELECT_LOCATION_NPC", {
              selectedNpc: "my example location npc id"
            })
          }
        >
          SELECT LOCATION NPC
        </button>
        <button
          onClick={() =>
            send("SELECT_ORGANIZATION_ORGANIZATION", {
              selectedOrganization: "my example location organization id"
            })
          }
        >
          SELECT LOCATION ORGANIZATION
        </button>
        <button
          onClick={() =>
            send("SELECT_LOCATION_LOCATION", {
              selectedLocation: "my example location location id"
            })
          }
        >
          SELECT LOCATION LOCATION
        </button>
      </div>
      <div style={{ display: "flex", height: 200 }}>
        <button onClick={() => send("BACK")}>BACK</button>
        <button onClick={() => send("BACK_TO_PARENT_LOCATION")}>
          BACK TO PARENT LOCATION
        </button>
      </div>
      <DefaultButton onClick={() => console.table(current)}>
        LOG STATE
      </DefaultButton>
    </>
  );
}
