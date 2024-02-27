export interface IMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    identityNumber: string;
    nationality: string;
    birthDate: Date;
    enabled: boolean;
    identityDocumentTypeId: number;
    password?: string;
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
        public email: string = '',
        public identityNumber: string = '',
        public nationality: string = '',
        public birthDate: Date = new Date(),
        public enabled: boolean = false,
        public identityDocumentTypeId: number = 0,
    ) {}
}
