export type MapProps = Region[];

export interface Region {
  id: number;
  name: string;
  aimag: Province[];
}

export interface Province {
  id: number;
  name: string;
  path: string;
}
