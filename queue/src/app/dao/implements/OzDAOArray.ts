import { Observable } from "rxjs";
import { Oz } from "src/app/admin/shared/interfaces/phpInterface";
import { OzDAO } from "../interfaces/OzDAO";
import { environment } from "src/environments/environments";
import { HttpClient } from "@angular/common/http";

export class OzDAOArray implements OzDAO {

  constructor(
    private http: HttpClient
    ) {}

  getAll(): Observable<Oz[]> {
    return this.http.get<Oz[]>(environment.baseUrl + 'getOZ/view.php')
  }

  edit(id: string, ...args: string[]): void {
    // throw new Error("Method not implemented.");
  }

  add(arg0: Oz): Observable<Oz> {
    throw new Error("Method not implemented.");
  }


  get(id: string): Observable<Oz> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Observable<Oz> {
    throw new Error("Method not implemented.");
  }

  update(oz: Oz): Observable<Oz> {
    throw new Error("Method not implemented.");
  }

}
