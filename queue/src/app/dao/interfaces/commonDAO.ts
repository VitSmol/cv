import { Observable } from "rxjs";

export interface CommonDAO<T> {

  getAll(): Observable<T[]>
  update(unit: T): Observable<T>
  add(unit: T): Observable<T>
  get(id: string): Observable<T>
  delete(id: string): Observable<T>
}
