import { FullName, Patient, ProstheticsType } from "./interfaces/interfaces";

export class testData {

  static dataArray: Patient[] = [
    {
      listnumber: "3310",
      date: "2023-04-15",
      lastname: "Смолицкий",
      name: "Виталий",
      fathername: "Яковлевич",
      sex: "м",
      birthday: "1985-12-14",
      address: "г. Москва, д. 1",
      diag: "ДФА",
      side: "справа",
      invalidgroup: "4",
      isOperated: "0",
      operdate: "0000-00-00",
      info: "проходит обследование",
      type: ProstheticsType.teks,
      org: FullName.ggkb1
    },
    {
      listnumber: "3311",
      date: "2021-03-01",
      lastname: "Жуков",
      name: "Георгий",
      fathername: "Константинович",
      sex: "м",
      birthday: "1915-11-12",
      address: "г. Москва, д. 1",
      diag: "ДФА",
      side: "справа",
      invalidgroup: "4",
      isOperated: "1",
      operdate: "2022-07-13",
      info: "прооперирован",
      type: ProstheticsType.tets,
      org: FullName.zlobin
    },
    {
      listnumber: "2075",
      date: "2016-11-15",
      lastname: "Ходченкова",
      name: "Светлана",
      fathername: "Алексеевна",
      sex: "ж",
      birthday: "1983-11-12",
      address: "г. Москва, д. 1",
      diag: "ДФА",
      side: "слева",
      invalidgroup: "1",
      isOperated: "1",
      operdate: "2022-07-13",
      info: "умер",
      type: ProstheticsType.tets,
      org: FullName.zlobin
    },
  ]
}
