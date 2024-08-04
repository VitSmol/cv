import { filter, map, Observable } from "rxjs";
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

  /// Чисто тестовый метод. Для изучения pipe, map и т.д.
  getAllTest() {
    return this.http.get<Oz[]>(environment.baseUrl + 'getOZ/view.php')
    // .pipe(map(data=>{
    //   return data.map(el => {
    //     return {
    //       ...el,
    //       orgname: el.orgname.toLowerCase(),
    //       index: 'after pipe'
    //     }
    //   })
    // }))
  }

  add(_arg0: Oz): Observable<Oz> {
    throw new Error("Method not implemented.");
  }


  get(_id: string): Observable<Oz> {
    throw new Error("Method not implemented.");
  }

  delete(_id: string): Observable<Oz> {
    throw new Error("Method not implemented.");
  }

  update(_oz: Oz): Observable<Oz> {
    throw new Error("Method not implemented.");
  }

}
function data(_value: Oz[], _index: number): unknown {
  throw new Error("Function not implemented.");
}

