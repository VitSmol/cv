import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface CommonDAO<T> {

  getAll(): Observable<T[]>
  update(patient: T): Observable<T>
  add(arg0: T): Observable<T>
  get(id: string): Observable<T>
  delete(id: string): Observable<T>
}
