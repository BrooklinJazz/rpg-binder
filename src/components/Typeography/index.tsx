import "./Typeography.scss";

import combineClasses from "combine-classes";
import React, { ReactNode } from "react";

interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  elementStyle?: "H1" | "H2" | "H3" | "Text";
  fontWeight?: "light" | "normal" | "medium" | "bold";
}

export const H1 = ({
  children,
  className,
  elementStyle = "H1",
  fontWeight = "light",
  ...props
}: IProps) => (
  <h1
    {...props}
    className={combineClasses(elementStyle, className, fontWeight)}
  >
    {children}
  </h1>
);
export const H2 = ({
  children,
  className,
  elementStyle = "H2",
  fontWeight = "light",
  ...props
}: IProps) => (
  <h2
    {...props}
    className={combineClasses(elementStyle, className, fontWeight)}
  >
    {children}
  </h2>
);

export const H3 = ({
  children,
  className,
  elementStyle = "H2",
  fontWeight = "light",
  ...props
}: IProps) => (
  <h3
    {...props}
    className={combineClasses(elementStyle, className, fontWeight)}
  >
    {children}
  </h3>
);

interface ITextProps extends IProps {
  size?: "small" | "regular" | "large";
}

export const Text = ({
  children,
  className,
  elementStyle,
  fontWeight = "light",
  ...props
}: ITextProps) => {
  const { size = elementStyle ? undefined : (props.size || "regular") } = props;
  return (
    <h3
      {...props}
      className={combineClasses(className, elementStyle, fontWeight, size, "Text")}
    >
      {children}
    </h3>
  );
};
