export interface IMatrixCell {
  id: number;
  amount: number;
}

export interface IRemoveInfo {
  showModal: boolean;
  rowNumber: number | undefined;
}

export interface IActiveRow {
  index: number;
  rowSum: number;
}

export interface INearestValue {
  id: number;
  amount: number;
  difference: number;
}