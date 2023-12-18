export interface IFish {
    id: number;
    name: string;
    averageWeight: number;
}

export class Fish implements IFish {
    constructor(
        public id: number = 0,
        public name: string = '',
        public averageWeight: number = 0
    ) {}
}