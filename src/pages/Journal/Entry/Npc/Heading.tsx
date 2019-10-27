import React from "react";
import EntryHeading from "../Heading";
import { useNpcEntryContext } from "./context";

const NpcEntryHeading = () => {
  const context = useNpcEntryContext();
  const { name, setName, save } = context
  console.log("NPC ENTRY HEADING", context);
  return (
    <>
      <EntryHeading value={name} setter={setName} save={save} />
      <button onClick={() => console.log(name)}>test</button>
    </>
  );
};

export default NpcEntryHeading;
