import * as jsc from '../../../../node_modules/jsverify/lib/jsverify.js';
import { PaginationService } from './pagination.service';
import * as R from 'ramda';

describe('PaginationService', () => {

  it('calculatePages', () => {
    expect(jsc.checkForall(jsc.nat, jsc.nat, jsc.nat, (offset: number, limit: number, size: number) => {
      const paginationContext = new PaginationService().calculatePages( offset, limit, size);
      return paginationContext.totalPages === Math.ceil(size / Math.max(limit, 1)) &&
        paginationContext.currentPage === Math.floor(offset / Math.max(limit, 1)) + 1 &&
        R.equals(paginationContext.pages, R.range(1, paginationContext.totalPages + 1));
    })).toBeTruthy();
  });

  it('isValidPageNumber', () => {
    expect(jsc.checkForall(jsc.nat, jsc.nat, jsc.nat, (offset: number, limit: number, size: number) => {
      const paginationContext = new PaginationService().calculatePages(offset, limit, size);
      return R.all(function (page: number) {
        return paginationContext.isValidPageNumber(page) && !paginationContext.isValidPageNumber(page + paginationContext.totalPages);
      })(paginationContext.pages);
    })).toBeTruthy();
  });

});




