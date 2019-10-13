import combineClasses from "combine-classes/lib";
import React, { useState } from "react";

import {
  faFacebook,
  faLinkedin,
  faMedium,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GridTemplateAreas, PROJECT_NAME } from "../../../common/constants";
import { Theme } from "../../../common/theme";
import Loading from "../../../components/Loading";
import { H1, H2, Text } from "../../../components/Typeography";
import { IJournalNavbarProps } from ".";
import { capitalize, ProviderList } from "../../../common/helpers";
import ProviderIcon from "../../../components/ProviderIcon";
import { CSSTransition } from "react-transition-group";

const MobileNavbar = ({ campaignName, logout }: IJournalNavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className={combineClasses(
          GridTemplateAreas.NAVBAR,
          Theme.primary,
          "JournalMobileNavbar"
        )}
      >
        <H1
          className="JournalNavbarSpacing"
          fontWeight="light"
          elementStyle="H3"
        >
          {PROJECT_NAME}
        </H1>
        <H1
          className="JournalNavbarSpacing"
          fontWeight="light"
          elementStyle="H3"
        >
        </H1>
        {/* <Text fontWeight="medium" size="large">
          {campaignName ? campaignName : <Loading />}
        </Text> */}
        <Text
          className="JournalNavbarIcon JournalMobileNavbarIcon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Text>
      </div>
        <CSSTransition
          classNames="JournalMobileNav"
          unmountOnExit
          in={menuOpen}
          timeout={500}
        >
          <div className="JournalMobileNavbarDropdown">
            {ProviderList.map(provider => (
              <Text
                key={provider}
                onClick={() => console.log(ProviderList)}
                className={combineClasses(
                  "JournalMobileNavbarListItem",
                  Theme.default,
                  Theme.hoverable
                )}
              >
                <ProviderIcon
                  colored={true}
                  hoverable={true}
                  className="JournalMobileNavbarProviderIcon"
                  provider={provider}
                />
                {capitalize(provider)}
              </Text>
            ))}
            <Text
              onClick={logout}
              className={combineClasses(
                "JournalMobileNavbarListItem extra-padding",
                Theme.default,
                Theme.hoverable
              )}
            >
              Sign Out
            </Text>
          </div>
        </CSSTransition>
    </>
  );
};

export default MobileNavbar;
