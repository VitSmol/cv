export enum ColumnsNames {
  number = '№ п.п.',
  fio = 'Фамилия, собственное имя, отчество (если таковое имеется) пациента',
  address = 'Адрес места жительства (места пребывания), телефон',
  sex = 'Пол (м,ж)',
  birthday = 'Дата рождения',
  date = 'Дата постановки на учет (число, месяц, год)',
  diag = 'диагноз',
  side = 'сторона',
  group = 'Группа инвалидности',
  operDate = 'Дата оперативного вмешательства (год, месяц, число)',
  note = 'Дополнительная информация',
  org = 'Организация здравоохранения',
  type = 'Тип протезирования'
}

export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface Resp {
  displayName?: string;
  email?: string;
  expiresIn?: string;
  idToken?: string;
  kind?: string;
  localId?: string;
  refreshToken?: string;
  registered?: boolean;
}

export enum Emails {
  admin = "it@gomeluzo.by",
  bsmp = "bsmp@mail.gomel.by",
  gokb = "reghosp@gokb.by",
  ggkb1 = "ggkb1@mail.gomel.by",
  mozyr = "mozyrcgp@mcgp.by",
  kalink = "kln-tmo@mail.gomel.by",
  zlobin = "zhlcrb@zhlcrb.by",
  rechica = "rcrb@rechitsa.by",
  svetlogorsk = "svetl-tmo@mail.gomel.by",
}

export enum FullName {
  gokb = "Гомельская областная клиническая больница",
  ggkb1 = "Гомельская городская клиническая больница №1",
  mozyr = "Мозырская центральная городская поликлиника",
  kalink = "Калинковичская центральная районная больница",
  zlobin = "Жлобинская центральная районная больница",
  rechica = "Речицкая центральная районная больница",
  svetlogorsk = "Светлогорская центральная районная больница",
}

export enum ShortName {
  gokb = "ГОКБ",
  ggkb1 = "ГГКБ№1",
  mozyr = "Мозырь",
  kalink = "Калинковичи",
  zlobin = "Жлобин",
  rechica = "Речица",
  svetlogorsk = "Светлогорск",
}

export type Org = {
  fullName: FullName,
  shortName: ShortName
  email: Emails,
}

export enum ProstheticsType {
  tets = "Тазобедренный сустав",
  teks = "Коленный сустав",
}

export interface Patient {
  id?: number;
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
