import React, { ReactNode } from "react";
import Loading from "../Loading";

interface IProps {
  className?: string;
  valueExists: any;
  children: ReactNode;
}

const Load = ({ valueExists, children, className }: IProps) =>
  Boolean(valueExists) ? <>{children}</> : <Loading className={className} />;

export default Load;
