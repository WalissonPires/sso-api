import { Inject, Injectable } from "@nestjs/common";
import { ITokenGenerator } from "src/app-domain/common/adapters/token-generator.adapter";
import { IUseCase } from "src/app-domain/common/use-cases";
import { FindUserByEmailPasswordUseCase, FindUserByEmailPasswordUseCaseInput } from "./find-user-by-email-passoword.usecase";


@Injectable()
export class AutenticateUseCase implements IUseCase<AutenticateUseCaseInput, AutenticateUseCaseResult> {

    constructor(
        private _findUserUseCase: FindUserByEmailPasswordUseCase,
        @Inject(ITokenGenerator) private _tokenGenerator: ITokenGenerator) {

    }

    public async execute(input: AutenticateUseCaseInput): Promise<AutenticateUseCaseResult> {

        const userResult = await this._findUserUseCase.execute(new FindUserByEmailPasswordUseCaseInput(input.email, input.password));
        if (!userResult) {

            const result = new AutenticateUseCaseResult(false);
            result.errorMessage = 'Usuário ou senha inválidos';
            return result;
        }

        const accessToken = await this._tokenGenerator.generateAccessToken({ sub: userResult.userId });

        const redirectUrl = new URL(input.returnUrl);
        redirectUrl.searchParams.append('access_token', accessToken);

        const result = new AutenticateUseCaseResult(true);
        result.redirectUrl = redirectUrl.toString();

        return result;
    }


}

export class AutenticateUseCaseInput {
    constructor(public email: string, public password: string, public returnUrl: string) {

    }
}

export class AutenticateUseCaseResult {

    public errorMessage: string | null = null;
    public redirectUrl: string | null = null;

    constructor(public sucesss: boolean) {}
}