export interface StaticTableI {
  rows: Row[];
}

export interface Row {
  cols: TdItem[];
  idx: number;
}

export interface TdItem {
  display: boolean;
  colspan: number;
  rowspan: number;
  content: string;
  idx: number;
}
