import { Observable } from "rxjs";
import { Patient } from "src/app/admin/shared/interfaces/phpInterface";
import { PatientsDAO } from "../interfaces/PatientsDAO";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environments";

export class PatientDAOArray implements PatientsDAO {

  constructor(
    private http: HttpClient
    ) {}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(environment.baseUrl + 'view.php');
  }

  update(patient: Patient): Observable<Patient> {
     return this.http.put<Patient>(environment.baseUrl + 'update.php', patient)
  }

  delete(id: string): Observable<Patient> {
    return this.http.delete<Patient>(environment.baseUrl + 'delete.php?id=' + id)
  }

  add(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(environment.baseUrl + 'insert.php', patient);
  }

  get(id: string): Observable<Patient> {
    throw new Error("Method not implemented.");
  }

}
