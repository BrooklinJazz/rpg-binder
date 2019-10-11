import "./Button.scss";

import combineClasses from "combine-classes";
import React from "react";

import { Theme } from "../../common/theme";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outlined" | "text";
}

const BaseButton = (props: IButtonProps) => (
  <button
    {...props}
    className={combineClasses(
      "Base",
      props.className,
      props.variant
    )}
  />
);

export const DefaultButton = (props: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(Theme.default, props.className)}
  />
);

export const PrimaryButton = (props: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(Theme.primary, props.className)}
  />
);

export const InfoButton = (props: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(Theme.info, props.className)}
  />
);

export const SecondaryButton = (props: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(Theme.secondary, props.className)}
  />
);

export const SuccessButton = (props: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(Theme.success, props.className)}
  />
);

export const DangerButton = (props: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(Theme.danger, props.className)}
  />
);
