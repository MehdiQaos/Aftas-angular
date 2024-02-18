import { IdentityDocumentType } from "./member";

export interface IMemberRanking {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    identityNumber: string;
    nationality: string;
    birthDate: Date;
    identityDocument: IdentityDocumentType;
    score: number;
    rank: number;
    competitionId: number;
}

export class MemberRanking implements IMemberRanking {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public identityNumber: string = '',
        public nationality: string = '',
        public birthDate: Date = new Date(),
        public identityDocument: IdentityDocumentType = IdentityDocumentType.CIN,
        public score: number = 0,
        public rank: number = 0,
        public competitionId: number = 0
    ) {}
}