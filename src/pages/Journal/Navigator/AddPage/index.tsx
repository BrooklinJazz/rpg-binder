import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import combineClasses from "combine-classes/lib";
import { Theme } from "../../../../common/theme";

const AddPage = () => {
    return (
        <div className={combineClasses("NavigatorAddPage", Theme.default, Theme.hoverable)}>
            <FontAwesomeIcon className="NavigatorPlusIcon" icon={faPlus}/> Page
        </div>
    )
}

export default AddPage;