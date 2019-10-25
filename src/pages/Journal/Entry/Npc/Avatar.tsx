import combineClasses from "combine-classes/lib";
import React from "react";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GridTemplateAreas } from "../../../../common/constants";
import { Theme } from "../../../../common/theme";
import { useNpcEntryContext } from "./context";

const Avatar = () => {
  const { avatar, setAvatar } = useNpcEntryContext();
  return (
    <div className={GridTemplateAreas.NPC_AVATAR}>
      {avatar ? (
        "Avatar"
      ) : (
        <FontAwesomeIcon
          className={combineClasses(Theme.hoverable, Theme.onDefault)}
          size="4x"
          icon={faImage}
        />
      )}
    </div>
  );
};

export default Avatar;
