export interface ISort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export class Sort implements ISort {
    constructor(
        public empty: boolean = false,
        public sorted: boolean = false,
        public unsorted: boolean = true
    ) {}
}