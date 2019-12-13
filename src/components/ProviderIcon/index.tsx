import "./ProviderIcon.scss";

import styled from "styled-components";

import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import { Provider } from "../../common/constants";
import { propsFromProvider } from "../../common/helpers";
import { onSurface } from "../../common/styles";
import { Icon } from "../StyledIcon";

interface IProps extends Omit<FontAwesomeIconProps, "icon"> {
  provider: Provider;
  colored?: boolean;
}

const ProviderIcon = styled(Icon).attrs((props: IProps) => ({
  icon: propsFromProvider(props.provider).icon
}))`
  /* if colored, set provider color. otherwise keep as onSurface  */
  & {
    color: ${(props: IProps) =>
      props.colored
        ? propsFromProvider(props.provider).color
        : onSurface(props)};
  }
  /* if hoverable, set hover color as provider color */
  &:hover {
    cursor: pointer;
    color: ${props => propsFromProvider(props.provider).color};
  }
`;

export default ProviderIcon;
