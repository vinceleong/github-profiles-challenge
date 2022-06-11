import * as FI from "react-icons/fi";
import { capitalize } from "utils/stringUtils";

function FeatherIcon(props: any) {
  const { children, ...rest } = props;
  const iconName: string = children.startsWith("Fi")
    ? children
    : `Fi${capitalize(children)}`;

  //@ts-ignore
  let CustomIcon = FI[iconName];

  if (typeof CustomIcon !== "function") CustomIcon = FI.FiOctagon;

  return (
    <CustomIcon
      style={{
        width: "25px",
        height: "25px",
      }}
      {...rest}
    />
  );
}

export default FeatherIcon;
