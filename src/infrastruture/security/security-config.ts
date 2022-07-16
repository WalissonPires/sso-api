import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class SecurityConfig {

    constructor(private readonly _configService: ConfigService) {

    }

    public getPrivateKey(): string {

        const privateKey = this._configService.get<string>('Certificate.PrivateKey')?.replace(/\\n/g, '\n');
        return privateKey;
    }

    public getPubliceKey(): string {

        const publiceKey = this._configService.get<string>('Certificate.PublicKey')?.replace(/\\n/g, '\n');
        return publiceKey;
    }

    public getPrivateKeyPassPhrase(): string {

        const privateKeyPhrase = this._configService.get<string>('Certificate.PrivateKeyPassPhrase');
        return privateKeyPhrase;
    }
}