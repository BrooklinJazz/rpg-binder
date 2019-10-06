import "./Snackbar.scss";

import combineClasses from "combine-classes";
import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { OnTheme, Theme } from "../../common/theme";
import Close from "../Close";

interface IBaseSnackbarProps extends ISnackbarProps {
  theme: Theme;
  onTheme: OnTheme;
}

const AUTO_HIDE_DURATION = 4000;

const BaseSnackbar = ({
  message,
  theme,
  onTheme,
  isOpen,
  close
}: IBaseSnackbarProps) => {
  useEffect(function autoHide() {
    setTimeout(() => {
      close();
    }, AUTO_HIDE_DURATION);
  });
  return (
    <CSSTransition
      classNames="SnackbarAnimation"
      unmountOnExit
      in={isOpen}
      timeout={AUTO_HIDE_DURATION}
    >
      <div className={combineClasses(theme, "SnackbarContainer")}>
        <p className={combineClasses(onTheme, "SnackbarText")}>{message}</p>
        <Close
          buttonProps={{
            onClick: () => close(),
            className: `${Theme.danger} SnackbarClose`
          }}
        />
      </div>
    </CSSTransition>
  );
};

interface ISnackbarProps {
  message: string | undefined;
  isOpen: boolean;
  close: () => void;
}

export const DangerSnackbar = (props: ISnackbarProps) => (
  <BaseSnackbar {...props} onTheme={OnTheme.onDanger} theme={Theme.danger} />
);
export const InfoSnackbar = (props: ISnackbarProps) => (
  <BaseSnackbar {...props} onTheme={OnTheme.onInfo} theme={Theme.info} />
);
export const SuccessSnackbar = (props: ISnackbarProps) => (
  <BaseSnackbar {...props} onTheme={OnTheme.onSuccess} theme={Theme.success} />
);
export const WarningSnackbar = (props: ISnackbarProps) => (
  <BaseSnackbar {...props} onTheme={OnTheme.onWarning} theme={Theme.warning} />
);
