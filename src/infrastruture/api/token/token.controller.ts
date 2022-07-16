import { Body, Controller, Get, NotImplementedException, Post } from "@nestjs/common";
import { SecurityConfig } from "src/infrastruture/security/security-config";
import { CreateTokenFromRefreshTokenModel, PublicKeyResult } from "./token.models";


@Controller('token')
export class TokenController {

    constructor(private readonly _securityConfig: SecurityConfig) {}


    @Get('publicKey')
    public getPublicKey() {

        const publicKey = this._securityConfig.getPubliceKey();
        return new PublicKeyResult(publicKey);
    }

    @Post('new')
    public createTokenFromRefreshToken(@Body() input: CreateTokenFromRefreshTokenModel) {

        throw new NotImplementedException();
    }
}