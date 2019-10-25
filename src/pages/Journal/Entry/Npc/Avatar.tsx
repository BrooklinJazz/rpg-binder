import combineClasses from "combine-classes/lib";
import React, { useRef, useEffect, useState } from "react";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GridTemplateAreas } from "../../../../common/constants";
import { Theme } from "../../../../common/theme";
import { useNpcEntryContext } from "./context";

const Avatar = () => {
  const { avatar, setAvatar } = useNpcEntryContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerInput = () => {
    if (inputRef.current) {
      inputRef.current!.click();
    }
  };
  const reader = new FileReader();
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (avatar) {
      reader.readAsDataURL(avatar);
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
    }
  }, [avatar]);

  return (
    <div className={GridTemplateAreas.NPC_AVATAR}>
      {avatar ? (
        <img className="AvatarImage" alt="alt" src={preview} />
      ) : (
        <div role="button" onClick={triggerInput}>
          <FontAwesomeIcon
            className={combineClasses(Theme.hoverable, Theme.onDefault)}
            size="4x"
            icon={faImage}
          />
        </div>
      )}
      <input
        onChange={e => e.target.files && setAvatar(e.target.files[0])}
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        accept="image/*"
      />
    </div>
  );
};

export default Avatar;
