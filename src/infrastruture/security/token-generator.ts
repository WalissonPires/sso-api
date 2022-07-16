import { Injectable } from "@nestjs/common";
import { AccessTokenInput, ITokenGenerator } from "src/app-domain/common/adapters/token-generator.adapter";
import { SecurityConfig } from "./security-config";
import { Secret, sign as jwtSign, SignOptions, verify } from "jsonwebtoken";
import { readFileSync, writeFileSync } from "fs";


@Injectable()
export class TokenGenerator implements ITokenGenerator {

    constructor(private readonly _config: SecurityConfig) {

    }

    public generateAccessToken(payload: AccessTokenInput): Promise<string> {

        const privateKey = this._config.getPrivateKey();
        const privateKeyPhrase = this._config.getPrivateKeyPassPhrase();

        return new Promise((resolve, reject) => {

            try {
                const secretOptions: Secret = {
                    key: privateKey,
                    passphrase: privateKeyPhrase
                };

                const signOptions: SignOptions =  {
                    algorithm: 'RS256',
                    expiresIn: '1h'
                };

                jwtSign(payload, secretOptions, signOptions, (error, token) => {

                    if (error)
                        reject(error);
                    else
                        resolve(token);
                });
            }
            catch(error) {
                reject(error);
            }
        });
    }

    public generateRefreshToken(): Promise<string> {

        const privateKey = this._config.getPrivateKey();
        const privateKeyPhrase = this._config.getPrivateKeyPassPhrase();

        return new Promise((resolve, reject) => {

            try {
                const secretOptions: Secret = {
                    key: privateKey,
                    passphrase: privateKeyPhrase
                };

                const signOptions: SignOptions =  {
                    expiresIn: '365d'
                };

                jwtSign({}, secretOptions, signOptions, (error, token) => {

                    if (error)
                        reject(error);
                    else
                        resolve(token);
                });
            }
            catch(error) {
                reject(error);
            }
        });
    }

}