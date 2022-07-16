import { IsNotEmpty, MaxLength } from "class-validator";


export class PublicKeyResult {
    constructor (public publicKey: string) {}
}

export class CreateTokenFromRefreshTokenModel {
    @IsNotEmpty()
    @MaxLength(2000)

    refreshToken: string;
}