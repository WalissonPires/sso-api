import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SecurityConfig } from "src/infrastruture/security/security-config";
import { IUserInfo } from "./request-user";


@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy) {

    constructor(config: SecurityConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            algorithms: ['RS256'],
            secretOrKey: config.getPubliceKey(),
        })
    }

    public async validate(payload: any) {

        const userInfo: IUserInfo = {
            userId: payload.sub,
        };

        return userInfo;
    }
}