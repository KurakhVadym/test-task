import { ChangeEvent, FC, useState } from "react";

import "./styles.css";
import { ISizeModalProps } from "./types";

export const SizeModal: FC<ISizeModalProps> = ({
  isOpen,
  handlePressBuild,
}: ISizeModalProps) => {
  const [rowsCount, setRowsCount] = useState(0);
  const [columnsCount, setColumnsCount] = useState(0);
  const [highlightCount, setHighlightCount] = useState(1);

  const onChangeM = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsCount(Number(e.target.value));
  };

  const onChangeN = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnsCount(Number(e.target.value));
  };

  const onChangeX = (e: ChangeEvent<HTMLInputElement>) => {
    setHighlightCount(Number(e.target.value));
  };

  return isOpen ? (
    <div className="darkBackground">
      <div className="container">
        <div className="title">Please select a value</div>

        <div className="inputWrapper">
          <div className="label">M: {rowsCount}</div>
          <input
            type="range"
            min={0}
            max={100}
            value={rowsCount}
            onChange={onChangeM}
          />
        </div>
        <div className="inputWrapper">
          <div className="label">N: {columnsCount}</div>
          <input
            type="range"
            min={0}
            max={100}
            value={columnsCount}
            onChange={onChangeN}
          />
        </div>
        <div className="inputWrapper">
          <div className="label">X: {highlightCount}</div>
          <input
            type="range"
            disabled={!columnsCount || !rowsCount}
            min={1}
            max={columnsCount * rowsCount}
            value={highlightCount}
            onChange={onChangeX}
          />
        </div>

        <button
          className="buildBtn"
          disabled={highlightCount >= columnsCount * rowsCount}
          onClick={() =>
            handlePressBuild(rowsCount, columnsCount, highlightCount)
          }
        >
          Build Matrix
        </button>
      </div>
    </div>
  ) : null;
};
