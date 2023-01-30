export interface IConfirmationModalProps {
  isOpen: boolean;
  rowNumber: number | undefined;
  handlePressClose(): void;
  handlePressDelete(): void;
}
