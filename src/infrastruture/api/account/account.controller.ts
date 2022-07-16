import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AutenticateUseCase, AutenticateUseCaseInput } from 'src/app-domain/user/use-cases/autenticate.usecase';
import { RegisterUseCase, RegisterUseCaseInput } from 'src/app-domain/user/use-cases/register.usecase';
import { ResponseNest } from '../common/responses/response-nest';
import { LoginModel, LoginResult, RegisterModel } from './account.models';

@Controller('account')
export class AccountController {

    constructor(
        private readonly _authenticateUseCase: AutenticateUseCase,
        private readonly _registreUseCase: RegisterUseCase
    ) { }

    @Post('login')
    public async login(@Body() input: LoginModel) {

        const result = await this._authenticateUseCase.execute(
            new AutenticateUseCaseInput(input.email, input.password, input.returnUrl),
        );

        if (result.sucesss) {
            return new LoginResult(result.redirectUrl);
        }

        throw new BadRequestException(result.errorMessage);
    }

    @Post('register')
    public async register(@Body() input: RegisterModel) {

        const result = await this._registreUseCase.execute(
            new RegisterUseCaseInput(input.name, input.email, input.password, input.confirmPassword),
        );

        if (result.sucesss) {
            return ResponseNest.WithStatusCode(204);
        }

        throw new BadRequestException(result.errorMessage);
    }
}