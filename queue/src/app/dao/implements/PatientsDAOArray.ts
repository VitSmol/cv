import { Observable } from "rxjs";
import { Patient } from "src/app/admin/shared/interfaces/phpInterface";
import { PatientsDAO } from "../interfaces/PatientsDAO";

export class PatientDAOArray implements PatientsDAO {
  baseURL!: string;
  
  add(arg0: Patient): Observable<Patient> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Patient[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Observable<Patient> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Observable<Patient> {
    throw new Error("Method not implemented.");
  }
  update(id: string): Observable<Patient> {
    throw new Error("Method not implemented.");
  }

}
