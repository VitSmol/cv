import { Patient } from "src/app/admin/shared/interfaces/phpInterface";
import { CommonDAO } from "./commonDAO";

export interface PatientsDAO extends CommonDAO<Patient> {
  //специфичные методы для работы с пациентами
}
