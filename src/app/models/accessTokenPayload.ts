export interface IAccessTokenPayload {
    authorities: string[];
    sub: string;
    iat: number;
    exp: number;
}