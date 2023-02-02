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
  operDate = 'Дата операции',
  note = 'Дополнительная информация',
  org = 'Организация здравоохранения'
}

export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface Auth {
  login(user: User): any
  setToken(resp: Resp): void
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

export enum Users {
  admin = "it@gomeluzo.by",
  bsmp = "bsmp@mail.gomel.by",
  ggkb1 = "ggkb1@mail.gomel.by",
  gokb = "reghosp@gokb.by",
  zlobin = "zhlcrb@zhlcrb.by",
  rechica = "rcrb@rechitsa.by",
  svetl = "svetl-tmo@mail.gomel.by",
  mozyr = "mozyrcgp@mcgp.by"
}
