import { ReactNode } from "react";

import FeatherIcon from "components/FeatherIcon";

function InfoRow({ icon, content }: { icon: string; content: ReactNode }) {
  return (
    <div className="flex flex-row items-center">
      <FeatherIcon
        style={{
          height: "15px",
          width: "15px",
        }}
      >
        {icon}
      </FeatherIcon>
      <div className="w-3" />
      {content}
    </div>
  );
}

export default InfoRow;
