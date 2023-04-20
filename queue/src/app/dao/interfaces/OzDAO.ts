import { Oz } from "src/app/admin/shared/interfaces/phpInterface";
import { CommonDAO } from "./commonDAO";

export interface OzDAO extends CommonDAO<Oz> {
  edit(id: string, ...args: string[]): void
}
