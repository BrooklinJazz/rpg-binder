import "./Button.scss";

import combineClasses from "combine-classes";
import React from "react";

import { Theme } from "../../common/theme";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "text";
}

const BaseButton = ({ className, ...props }: IButtonProps) => (
  <button
    {...props}
    className={combineClasses("Base", Theme.hoverable, className)}
  />
);

export const DefaultButton = ({ className, variant, ...props }: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(
      variant === "text" ? Theme.onDefault : Theme.default,
      className
    )}
  />
);

export const PrimaryButton = ({ className, variant, ...props }: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(
      variant === "text" ? Theme.onPrimary : Theme.primary,
      className
    )}
  />
);

export const InfoButton = ({ className, variant, ...props }: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(
      variant === "text" ? Theme.onDefault : Theme.info,
      className
    )}
  />
);

export const SecondaryButton = ({ className, variant, ...props }: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(
      variant === "text" ? Theme.onSecondary : Theme.secondary,
      className
    )}
  />
);

export const SuccessButton = ({ className, variant, ...props }: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(
      variant === "text" ? Theme.onSuccess : Theme.success,
      className
    )}
  />
);

export const DangerButton = ({ className, variant, ...props }: IButtonProps) => (
  <BaseButton
    {...props}
    className={combineClasses(
      variant === "text" ? Theme.onDanger : Theme.danger,
      className
    )}
  />
);
