import { Observable } from "rxjs";
import { Types } from "src/app/admin/shared/interfaces/phpInterface";
import { TypesDAO } from "../interfaces/typesDAO";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environments";

export class TypesDAOArray implements TypesDAO {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Types[]> {
    return this.http.get<Types[]>(environment.baseUrl + 'getTypes/view.php')
  }

  update(patient: Types): Observable<Types> {
    throw new Error("Method not implemented.");
  }

  add(arg0: Types): Observable<Types> {
    throw new Error("Method not implemented.");
  }

  get(id: string): Observable<Types> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Observable<Types> {
    throw new Error("Method not implemented.");
  }

}
