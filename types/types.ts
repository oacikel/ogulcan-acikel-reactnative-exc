export interface DataPoint {
    c: number;
    h: number;
    l: number;
    o: number;
    t: number;
    v: number;
  }
  
  export interface MockData {
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    t: number[];
    v: number[];
    s: string;
    nextTime: number | null;
  }

  export type TimeFilter = '7D' | '1M'