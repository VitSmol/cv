import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: number | Date, ...args: string[]): number | string | undefined {
    if (typeof value === 'number') {
      return value;
    } else if (value instanceof Date) {
      const date = {
        day: value.getDate(),
        month: value.getMonth() + 1,
        year: value.getFullYear()
      }

      let month = date.month < 10 ? '0' + date.month : date.month;
      let day = date.day < 10 ? '0' + date.day : date.day;
      return `${day}.${month}.${date.year}`;
    } else {
      return undefined;
    }
  }

}
