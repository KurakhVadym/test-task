export interface IDataCellProps {
  onClick(): void
  value: number
  isActive: boolean
  percentage: number
  onMouseOut(): void
  onMouseOver(): void
  highlighted: boolean
}
