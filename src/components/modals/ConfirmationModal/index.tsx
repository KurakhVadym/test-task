import { FC } from "react";

import "./styles.css";
import { IConfirmationModalProps } from "./types";

export const ConfirmationModal: FC<IConfirmationModalProps> = ({
  isOpen,
  rowNumber,
  handlePressClose,
  handlePressDelete,
}: IConfirmationModalProps) => {
  return isOpen ? (
    <div className="darkBackground" onClick={handlePressClose}>
      <div
        className="container confirmModal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title">
          Are you sure, you want to delete line {rowNumber}?
        </div>

        <div>
          <button className="cancelBtn" onClick={handlePressClose}>
            No, Back
          </button>
          <button className="deleteBtn" onClick={handlePressDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
