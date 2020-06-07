import { TdItem } from './table.model';

export type TypeOfEvent =
  | 'increaseRowspan'
  | 'decreaseRowspan'
  | 'increaseColspan'
  | 'decreaseColspan'
  | 'toggleTdDisplay';

export interface TableEvents {
  type: TypeOfEvent;
  rowIdx?: number;
  tdIdx?: number;
  td?: TdItem;
}
