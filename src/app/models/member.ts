export interface IMember {
    id: number;
    firstName: string;
    lastName: string;
    identityNumber: string;
    nationality: string;
    birthDate: Date;
    identityDocumentTypeId: number;
}

export enum IdentityDocumentType {
    CIN = 'CIN',
    CARTE_RESIDENCE = 'CARTE_RESIDENCE',
    PASSPORT = 'PASSPORT'
}

export class Member implements IMember {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public identityNumber: string = '',
        public nationality: string = '',
        public birthDate: Date = new Date(),
        public identityDocumentTypeId: number = 0,
    ) {}
}
