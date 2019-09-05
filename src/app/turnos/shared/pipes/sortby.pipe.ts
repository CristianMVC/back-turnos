import { PipeTransform, Pipe } from '@angular/core';
import * as R from 'ramda';

@Pipe({name: 'sortBy'})
export class SortByPipe implements PipeTransform {
  transform(array: any[], key: string): any[] {
    return R.sortBy(R.prop(key))(array);
  }
}
