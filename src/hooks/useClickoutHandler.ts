import React, { useEffect } from "react";
const useClickoutHandler = (
  ref: React.MutableRefObject<any>,
  onClickout: Function
) => {
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickout();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export default useClickoutHandler;
