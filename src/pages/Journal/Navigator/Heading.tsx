import React from "react";
import { H2, Text } from "../../../components/Typeography";
import Load from "../../../components/Load";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Theme } from "../../../common/theme";
import combineClasses from "combine-classes/lib";

interface IProps {
  campaignName: string | undefined;
  toggleCampaignList: () => void;
}

const NavigatorHeading = ({ campaignName, toggleCampaignList }: IProps) => {
  return (
    <div className={combineClasses("NavigatorHeading", Theme.default)}>
      <Text onClick={toggleCampaignList} className="NavigatorBars">
        <FontAwesomeIcon icon={faBars} />
      </Text>
      <Load valueExists={campaignName}>
        <Text>{campaignName}</Text>
      </Load>
      <Text>
        <FontAwesomeIcon icon={faSearch} />
      </Text>
    </div>
  );
};

export default NavigatorHeading;
