import { IPageable, Pageable } from "./pageable";
import { ISort, Sort } from "./sort";

export interface IPage<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export class Page<T> implements IPage<T> {
  constructor(
    public content: T[] = [],
    public pageable: IPageable = new Pageable(),
    public last: boolean = false,
    public totalElements: number = 0,
    public totalPages: number = 0,
    public size: number = 0,
    public number: number = 0,
    public sort: ISort = new Sort(),
    public numberOfElements: number = 0,
    public first: boolean = false,
    public empty: boolean = false
  ) {}
}

// export class Page<T> implements IPage<T> {
//   constructor(
//     public content: T[] = [],
//     public pageable: Pageable,
//     public last: boolean,
//     public totalElements: number,
//     public totalPages: number,
//     public size: number,
//     public number: number,
//     public sort: Sort,
//     public numberOfElements: number,
//     public first: boolean,
//     public empty: boolean
//   ) {}
// }