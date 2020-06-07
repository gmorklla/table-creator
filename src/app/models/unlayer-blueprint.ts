export interface UnlayerBlueprint {
  body: Body;
}

interface Body {
  rows: Row[];
  values: Values3;
}

interface Values3 {
  backgroundColor: string;
  backgroundImage: BackgroundImage;
  contentWidth: string;
  fontFamily: FontFamily;
}

interface FontFamily {
  label: string;
  value: string;
  type: string;
  weights: string;
}

interface Row {
  cells: number[];
  columns: Column[];
  values: Values2;
}

interface Values2 {
  backgroundColor: string;
  backgroundImage: BackgroundImage;
  padding: string;
  columnsBackgroundColor: string;
  selectable: boolean;
  draggable: boolean;
  deletable: boolean;
}

interface BackgroundImage {
  url: string;
  fullWidth: boolean;
  repeat: boolean;
  center: boolean;
  cover: boolean;
}

interface Column {
  contents: Content[];
}

interface Content {
  type: string;
  values: Values;
}

interface Values {
  maxWidth?: string;
  src?: Src;
  draggable: boolean;
  containerPadding: string;
  deletable: boolean;
  selectable: boolean;
  action?: Action;
  altText?: string;
  fullWidth?: boolean;
  textAlign: string;
  color?: string;
  lineHeight?: string;
  text?: string;
  width?: string;
  border?: Border;
  buttonColors?: ButtonColors;
  calculatedHeight?: number;
  calculatedWidth?: number;
  href?: string;
  padding?: string;
  borderRadius?: string;
}

interface ButtonColors {
  color: string;
  backgroundColor: string;
  hoverColor: string;
}

interface Border {
  borderTopWidth: string;
  borderTopStyle: string;
  borderTopColor: string;
}

interface Action {
  url: string;
  target: string;
}

interface Src {
  url: string;
  width: number;
  height: number;
}
