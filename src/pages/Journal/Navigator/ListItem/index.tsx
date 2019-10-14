import React, { ReactNode } from "react";
import combineClasses from "combine-classes/lib";
import "./ListItem.scss";
import { Theme } from "../../../../common/theme";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  children: ReactNode;
}

const ListItem = ({ active, children, className, ...props }: IProps) => {
  return (
    <div
      {...props}
      className={combineClasses(
        className,
        "NavigatorListItem",
        [active, "active"],
        Theme.default,
        Theme.hoverable
      )}
    >
      {children}
    </div>
  );
};

export default ListItem;
