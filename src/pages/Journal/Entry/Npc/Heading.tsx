import React from "react";
import EntryHeading from "../Heading";
import { useNpcEntryContext } from "./context";

const NpcEntryHeading = () => {
    const {name, setName, save} = useNpcEntryContext();
    return <EntryHeading value={name} setter={setName} save={save} />
}

export default NpcEntryHeading;
