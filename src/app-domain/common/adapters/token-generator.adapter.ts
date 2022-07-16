

export const ITokenGenerator = Symbol('app-domain.common.adapters.token-generator');

export interface ITokenGenerator {

    generateAccessToken(payload: AccessTokenInput): Promise<string>;
    generateRefreshToken(): Promise<string>;
}

export class AccessTokenInput {

    constructor(public sub: string) {}
}