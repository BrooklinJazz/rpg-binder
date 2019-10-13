import { Machine, assign, EventObject } from "xstate";
import { useMachine } from "@xstate/react";
import React, { useState } from "react";

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
// TODO implement advanced location states

// This machine is completely decoupled from React
export const journalMachine = Machine({
  id: "toggle",
  initial: "init",
  context: {
    selectedNpc: undefined,
    selectedLocation: undefined,
    selectedOrganization: undefined
  },
  states: {
    init: {
      on: {
        DISPLAY_NPCS: {
          target: "displayNpcs"
        },
        DISPLAY_LOCATIONS: {
          target: "displayLocations"
        },
        DISPLAY_ORGANIZATIONS: {
          target: "displayOrganizations"
        }
      }
    },
    displayNpcs: {
      on: {
        SELECT_NPC: {
          target: "selectedNpc",
          actions: [
            assign({ selectedNpc: (_: any, event: any) => event.selectedNpc })
          ]
        }
      }
    },
    displayOrganizations: {
      on: {
        SELECT_ORGANIZATION: {
          target: "selectedOrganization",
          actions: [
            assign({
              selectedOrganization: (_: any, event: any) =>
                event.selectedOrganization
            })
          ]
        }
      }
    },
    displayLocations: {
      on: {
        SELECT_LOCATION: {
          target: "selectedLocation",
          actions: [
            assign({
              selectedLocation: (_: any, event: any) => event.selectedLocation
            })
          ]
        }
      }
    },
    selectedNpc: {},
    selectedLocation: {
    //   initial: "init",
    //   states: {
    //     init: {},
    //     displayNpcs: {},
    //     displayLocations: {},
    //     displayOrganizations: {}
    //   }
    },
    selectedOrganization: {}
  }
});

export function Test() {
  const [current, send] = useMachine(journalMachine);

  return (
    <>
      <div>
        STATE: {current.value}
        SELECTED LOCATION: {current.context.selectedLocation}
        SELECTED NPC: {current.context.selectedNpc}
        SELECTED ORGANIZATION: {current.context.selectedOrganization}
      </div>
      <button onClick={() => send("DISPLAY_NPCS")}>DISPLAY NPC</button>
      <button onClick={() => send("DISPLAY_ORGANIZATIONS")}>
        DISPLAY ORGANIZATIONS
      </button>
      <button onClick={() => send("DISPLAY_LOCATIONS")}>
        DISPLAY LOCATIONS
      </button>
      <button
        onClick={() => send("SELECT_NPC", { selectedNpc: "my example npc id" })}
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
    </>
  );
}
