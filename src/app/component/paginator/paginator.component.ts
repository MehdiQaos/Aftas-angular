import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() pageFirst: boolean = false;
  @Input() pageLast: boolean = false;
  @Input() pageNumber: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  previousPage(): void {
    this.pageNumber--;
    this.pageChange.emit(this.pageNumber);
  }

  nextPage(): void {
    this.pageNumber++;
    this.pageChange.emit(this.pageNumber);
  }
}
