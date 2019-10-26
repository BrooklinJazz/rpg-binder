import combineClasses from "combine-classes/lib";
import React, { useEffect, useRef, useState } from "react";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GridTemplateAreas } from "../../../../common/constants";
import { Theme } from "../../../../common/theme";
import usePrevious from "../../../../hooks/usePrevious";
import { useNpcEntryContext } from "./context";

const Avatar = () => {
  const { avatar, setAvatar, save } = useNpcEntryContext();
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerInput = () => {
    if (inputRef.current) {
      inputRef.current!.click();
    }
  };
  const reader = new FileReader();

  const prevAvatar = usePrevious(avatar);

  useEffect(() => {
    if (avatar && avatar !== prevAvatar) {
      save();
    }
  }, [avatar]);

  useEffect(() => {
    if (avatarFile) {
      reader.readAsDataURL(avatarFile);
      reader.addEventListener("load", () => {
        setAvatar(reader.result as string);
      });
    }
    return reader.removeEventListener("load", () => "no effect");
  }, [avatarFile, reader]);

  return (
    <div className={GridTemplateAreas.NPC_AVATAR}>
      {avatar ? (
        <img onClick={triggerInput} className="AvatarImage" alt="alt" src={avatar} />
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
        onChange={e => e.target.files && setAvatarFile(e.target.files[0])}
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        accept="image/*"
      />
    </div>
  );
};

export default Avatar;
