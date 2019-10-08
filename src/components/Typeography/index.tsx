import "./Typeography.scss";

import combineClasses from "combine-classes";
import React, { ReactNode } from "react";

interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  elementStyle?: "H1" | "H2" | "H3" | "Body";
  fontWeight?: "light" | "regular" | "medium" | "bold";
}

export const H1 = ({
  children,
  className,
  elementStyle = "H1",
  fontWeight = "regular",
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
  fontWeight = "regular",
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
  fontWeight = "regular",
  ...props
}: IProps) => (
  <h3
    {...props}
    className={combineClasses(elementStyle, className, fontWeight)}
  >
    {children}
  </h3>
);

export const Body = ({
  children,
  className,
  elementStyle = "Body",
  fontWeight = "regular",
  ...props
}: IProps) => (
  <h3
    {...props}
    className={combineClasses(elementStyle, className, fontWeight)}
  >
    {children}
  </h3>
);
