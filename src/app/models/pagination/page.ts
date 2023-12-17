import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface IPage<T> {
  content: T[];
  pageable?: Pageable;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
  sort?: Sort;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}

export class Page<T> implements IPage<T> {
  constructor(
    public content: T[] = [],
    public pageable?: Pageable,
    public last?: boolean,
    public totalElements?: number,
    public totalPages?: number,
    public size?: number,
    public number?: number,
    public sort?: Sort,
    public numberOfElements?: number,
    public first?: boolean,
    public empty?: boolean
  ) {}
}