export enum ColumnsNames {
  number = '№ п.п.',
  fio = 'Ф.И.О.',
  address = 'Адрес места жительства (места пребывания), телефон',
  sex = 'Пол (м,ж)',
  birthday = 'Дата рождения (число, месяц, год)',
  date = 'Дата постановки на учет (чсило, месяц, год)',
  diag = 'Диагноз',
  side = 'сторона',
  group = 'Группа инвалидности',
  operDate = 'Дата операции',
  note = 'Дополнительная информация',
  org = 'Организация здравоохранения'
}

export interface User {
  email: string;
  password: string;
}

export interface Auth {
  login(user: User): any
}
