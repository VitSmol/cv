export interface Patient {
  id: string;
  name?: string;
  lastname?: string;
  listnumber?: string;
  fathername?: string;
  date: string;
  birthday?: string;
  address?: string;
  diag?: string;
  operdate?: string;
  info?: string;
  type?: string;
  org?: string;
  sex?: string;
  isOperated?: string;
  side?: string;
  invalidgroup?: string;
}

export interface Oz {
  id?: number;
  orgname: string;
  orgshortname: string;
  email: string;
}

export interface Types {
  id: number;
  type: string;
}
