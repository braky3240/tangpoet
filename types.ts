export enum TangEra {
  EARLY = '初唐',
  HIGH = '盛唐',
  MIDDLE = '中唐',
  LATE = '晚唐',
}

export interface Poet {
  id: string;
  name: string;
  description: string;
  start: number;
  end: number;
  era: TangEra;
}

export interface EraColor {
  bg: string;
  text: string;
  hex: string;
}
