import React, { ReactNode } from "react";
import { Text } from "../../../components/Typeography";
import Load from "../../../components/Load";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Theme } from "../../../common/theme";
import combineClasses from "combine-classes/lib";
import { useJournalMachine } from "../../../context/navigator";
import Fade from "../../../components/Fade";

interface IProps {
  children: ReactNode | undefined;
  toggleCampaignList: () => void;
}

const NavigatorHeading = ({ children, toggleCampaignList }: IProps) => {
  const { actions, context } = useJournalMachine();
  return (
    <div className={combineClasses("NavigatorHeading", Theme.default)}>
      <div className="NavigatorLeftContent">
        <Text onClick={toggleCampaignList} className="NavigatorBars">
          <FontAwesomeIcon icon={faBars} />
        </Text>
        <Fade in={Boolean(context.selectedLocation)}>
          <Text
            onClick={actions.back}
            className={combineClasses(
              "NavigatorHeadingArrow",
              Theme.onDefault,
              Theme.hoverable
            )}
          >
            <FontAwesomeIcon
              className={combineClasses(Theme.onDefault, Theme.hoverable)}
              icon={faArrowLeft}
            />
          </Text>
        </Fade>
      </div>
      <Load valueExists={children}>
        <Text>{children}</Text>
      </Load>
      <Text>
        <FontAwesomeIcon icon={faSearch} />
      </Text>
    </div>
  );
};

export default NavigatorHeading;
