import React from "react";
import "./CampaignList.scss";
import { Text } from "../../../../components/Typeography";
import combineClasses from "combine-classes/lib";
import { Theme } from "../../../../common/theme";
import { CSSTransition } from "react-transition-group";

interface IProps {
  open: boolean;
}

const CampaignList = ({ open }: IProps) => {
  return (
    <CSSTransition
      classNames="navigator-campaigns"
      unmountOnExit
      in={open}
      timeout={200}
    >
      <div className="NavigatorCampaigns">
        <Text
          className={combineClasses("NavigatorCampaignsHeading", Theme.default)}
        >
          Campaigns
        </Text>
      </div>
    </CSSTransition>
  );
};

export default CampaignList;
