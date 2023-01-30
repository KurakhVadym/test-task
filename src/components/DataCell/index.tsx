import { FC } from "react";

import { IDataCellProps } from "./types";

export const DataCell: FC<IDataCellProps> = ({
  value,
  onClick,
  isActive,
  percentage,
  onMouseOut,
  onMouseOver,
  highlighted,
}: IDataCellProps) => {
  return (
    <th
      className={`dataCell ${highlighted ? "highlightCell" : ""}`}
      onClick={onClick}
      style={
        isActive
          ? {
              background: `linear-gradient(transparent, rgba(248, 174, 132, ${
                percentage / 50
              }))`,
            }
          : {}
      }
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      {isActive ? `${percentage}%` : value}
    </th>
  );
};
