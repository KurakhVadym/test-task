import { FC, useState } from "react";

import "./styles.css";
import basket from "../../assets/icons/basket.svg";
import { IMatrixCell, IRemoveInfo, IActiveRow, INearestValue } from "./types";
import { SizeModal } from "../../components/modals/SizeModal";
import { ConfirmationModal } from "../../components/modals/ConfirmationModal";
import { DataCell } from "../../components/DataCell";

const Home: FC = () => {
  const [highlightLimit, setHighlightLimit] = useState(0);
  const [showModal, setVisibleModal] = useState(true);
  const [removeInfo, setRemoveInfo] = useState<IRemoveInfo>({
    showModal: false,
    rowNumber: undefined,
  });
  const [matrix, setMatrix] = useState<Array<Array<IMatrixCell>>>([
    [{ id: 0, amount: 0 }],
  ]);
  const [activeRow, setActiveRow] = useState<IActiveRow | undefined>(undefined);
  const [listNearestValue, setListNearestValue] = useState<
    Array<INearestValue>
  >([]);

  const getRandomValue = () => {
    return Math.floor(Math.random() * 1000);
  };

  const buildMatrix = (M: number, N: number, X: number) => {
    if (!M || !N) return;

    setHighlightLimit(X);
    setVisibleModal(false);
    setMatrix(
      Array(M)
        .fill(undefined)
        .map((_, i) => {
          return Array(N)
            .fill(undefined)
            .map((_, j) => {
              return {
                id: Number(`${i}${j}`),
                amount: getRandomValue(),
              };
            });
        })
    );
  };

  const getAverageValue = (column: number) => {
    let columnSum = 0;
    for (let i = 0; i < matrix.length; i++) {
      columnSum += matrix[i][column]?.amount;
    }

    return Math.floor((columnSum / matrix.length) * 100) / 100;
  };

  const handleCellClick = (M: number, N: number) => {
    setMatrix((prev) =>
      prev.map((item, i) =>
        i === M
          ? item.map((el, j) =>
              j === N ? { id: el.id, amount: el.amount + 1 } : el
            )
          : item
      )
    );
  };

  const addRow = () => {
    setMatrix((prev) => [
      ...prev,
      Array(matrix[0].length)
        .fill(undefined)
        .map((_, j) => {
          return {
            id: Number(`${matrix.length}${j}`),
            amount: getRandomValue(),
          };
        }),
    ]);
  };

  const deleteRow = () => {
    setMatrix((prev) => prev?.filter((_, i) => i + 1 !== removeInfo.rowNumber));
    hideConfirmationModal();
  };

  const showConfirmationModal = (M: number) => {
    setRemoveInfo({
      showModal: true,
      rowNumber: M + 1,
    });
  };

  const hideConfirmationModal = () => {
    setRemoveInfo({
      showModal: false,
      rowNumber: undefined,
    });
  };

  const calculatePercentage = (amount: number) => {
    if (!activeRow) return 0;
    return Math.floor(((amount * 100) / activeRow?.rowSum) * 100) / 100;
  };

  const checkHighlighted = (amount: number) =>
    listNearestValue.find((e) => e.amount === amount) ? true : false;

  const searchNearest = (value: number) => {
    const list = [];
    for (let item of matrix) {
      list.push(
        ...item.map((e) => ({ ...e, difference: Math.abs(value - e.amount) }))
      );
    }

    setListNearestValue(
      list
        .filter((e) => e.difference !== 0)
        .sort((a, b) => a.difference - b.difference)
        .slice(0, highlightLimit)
    );
  };

  return (
    <>
      {showModal || (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th className="emptyCell"></th>
                <th></th>
                {matrix[0]?.map((_, i) => {
                  return <th key={i}>{`Cell values\nN =${i + 1}`}</th>;
                })}
                <th>Sum value</th>
              </tr>
            </thead>
            <tbody>
              {matrix?.map((el, i) => {
                let rowSum = 0;
                return (
                  <tr key={i}>
                    <th
                      className="removeCell"
                      onClick={() => showConfirmationModal(i)}
                    >
                      <img src={basket} alt="basket-icon" />
                    </th>
                    <th className="labelCell">{`Cell values\nM = ${i + 1}`}</th>
                    {el?.map((cell, j) => {
                      rowSum += cell.amount;

                      return (
                        <DataCell
                          key={cell.id}
                          value={cell.amount}
                          highlighted={checkHighlighted(cell.amount)}
                          isActive={activeRow?.index === i}
                          onClick={() => handleCellClick(i, j)}
                          onMouseOut={() => setListNearestValue([])}
                          onMouseOver={() => searchNearest(cell.amount)}
                          percentage={calculatePercentage(cell.amount)}
                        />
                      );
                    })}
                    <th
                      onMouseOver={() => setActiveRow({ index: i, rowSum })}
                      onMouseOut={() => setActiveRow(undefined)}
                    >
                      {rowSum}
                    </th>
                  </tr>
                );
              })}
              <tr>
                <th className="emptyCell"></th>
                <th className="labelCell">{`Average\nvalues`}</th>
                {matrix[0]?.map((_, i) => {
                  return <th key={i}>{getAverageValue(i)}</th>;
                })}
                <th></th>
              </tr>
            </tbody>
          </table>
          <button className="addButton" onClick={addRow}>
            + Add Row
          </button>
        </div>
      )}

      <SizeModal isOpen={showModal} handlePressBuild={buildMatrix} />
      <ConfirmationModal
        isOpen={removeInfo.showModal}
        rowNumber={removeInfo.rowNumber}
        handlePressClose={hideConfirmationModal}
        handlePressDelete={deleteRow}
      />
    </>
  );
};

export default Home;
