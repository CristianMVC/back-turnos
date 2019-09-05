import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { PaginationService } from './pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent implements OnInit, OnChanges {

  @Input() itemsSize: number;
  @Input() pageSize: number;
  offset = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  paginationContext: PaginationContext;

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
    this.paginationContext = this.calculatePages(this.offset);
  }

  ngOnChanges() {
    this.paginationContext = this.calculatePages(this.offset);
  }

  selectPage(page: number, event: Event) {
    this.cancelEvent(event);
    if (this.paginationContext.isValidPageNumber(page)) {
      const offset = (page - 1) * this.pageSize;
      this.paginationContext = this.calculatePages(offset);
      this.pageChange.emit(offset);
    }
  }

  isTheFirstOne(): boolean {
    return this.paginationContext.isTheFirstOne();
  }

  isTheLastOne(): boolean {
    return this.paginationContext.isTheLastOne();
  }

  isTheCurrentPage(page: number): boolean {
    return this.paginationContext.isTheCurrentPage(page);
  }

  private cancelEvent(event: Event): void {
    event.preventDefault();
  }

  private calculatePages(offset: number) {
    return this.paginationService.calculatePages(offset, this.pageSize, this.itemsSize);
  }

}
