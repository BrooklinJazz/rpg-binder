import combineClasses from "combine-classes/lib";
import React from "react";

import { GridTemplateAreas, PROJECT_NAME } from "../../../common/constants";
import { ProviderList } from "../../../common/helpers";
import { Theme } from "../../../common/theme";
import Loading from "../../../components/Loading";
import ProviderIcon from "../../../components/ProviderIcon";
import { H1, Text } from "../../../components/Typeography";
import { IJournalNavbarProps } from "./";
import ThemeIcon from "./ThemeIcon";

const DesktopNavbar = ({ campaignName, logout }: IJournalNavbarProps) => {
  return (
    <div
      className={combineClasses(
        GridTemplateAreas.NAVBAR,
        Theme.primary,
        "JournalNavbar"
      )}
    >
      <H1 fontWeight="light" elementStyle="H3">
        {PROJECT_NAME}
      </H1>
      <Text fontWeight="medium" size="large">
        {campaignName ? campaignName : <Loading />}
      </Text>
      <div className="JournalNavbarRight">
        <ThemeIcon/>
        {ProviderList.map(provider => (
          <ProviderIcon
            key={provider}
            provider={provider}
            hoverable
            className="JournalNavbarSpacing facebook"
          />
        ))}
        <Text
          onClick={logout}
          className={combineClasses(
            "JournalNavbarSpacing",
            Theme.hoverable,
            Theme.onPrimary
          )}
        >
          Sign Out
        </Text>
      </div>
    </div>
  );
};

export default DesktopNavbar;
