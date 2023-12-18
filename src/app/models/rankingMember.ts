export interface IRankingMember {
    rankingId: number;
    memberId: number;
    competitionId: number;
    firstName: string;
    lastName: string;
}

export class RankingMember implements IRankingMember {
    constructor(
        public rankingId: number = 0,
        public memberId: number = 0,
        public competitionId: number = 0,
        public firstName: string = '',
        public lastName: string = ''
    ) {}
}