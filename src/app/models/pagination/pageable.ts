import { ISort, Sort } from "./sort";

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export class Pageable implements IPageable {
    constructor(
        public pageNumber: number = 0,
        public pageSize: number = 0,
        public sort: ISort = new Sort(),
        public offset: number = 0,
        public paged: boolean = false,
        public unpaged: boolean = false
    ) {}
}