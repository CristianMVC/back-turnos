import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable()
export class PaginationService {

    constructor() { }

    calculatePages(offset: number, limit: number, size: number): PaginationContext {
        const currentPage = getCurrentPage();
        const totalPages = getTotalPages();
        // tslint:disable-next-line:no-magic-numbers
        const pages = R.range(1, totalPages + 1);


        function getCurrentPage(): number {
            return Math.floor(offset / Math.max(limit, 1)) + 1;
        }

        function getTotalPages(): number {
            return Math.ceil(size / Math.max(limit, 1));
        }

        function isValidPageNumber(page: number): boolean {
            return page > 0 && page <= totalPages;
        }

        function isTheFirstOne(): boolean {
            return currentPage === 1
        }

        function isTheLastOne(): boolean {
            return currentPage === totalPages;
        }

        function isTheCurrentPage(page: number): boolean {
            return currentPage === page;
        }

        function hasResults(): boolean {
            return totalPages > 0;
        }

        return {
            currentPage: currentPage,
            totalPages: totalPages,
            pages: pages,
            isValidPageNumber: isValidPageNumber,
            isTheFirstOne: isTheFirstOne,
            isTheLastOne: isTheLastOne,
            isTheCurrentPage: isTheCurrentPage,
            hasResults: hasResults
        }
    }

}
