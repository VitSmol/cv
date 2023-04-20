import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface CommonDAO<T> {

  add(arg0: T): Observable<T>;
  getAll(): Observable<T[]>
  get(id: string): Observable<T>;
  delete(id: string): Observable<T>;
  update(id: string): Observable<T>;
}
