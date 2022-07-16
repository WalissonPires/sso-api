import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AutenticateUseCase, AutenticateUseCaseInput } from 'src/app-domain/user/use-cases/autenticate.usecase';
import { FindUserByIdUseCase, FindUserByIdUseCaseInput } from 'src/app-domain/user/use-cases/find-user-by-id.usecase';
import { RegisterUseCase, RegisterUseCaseInput } from 'src/app-domain/user/use-cases/register.usecase';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { IRequestWithUser } from '../auth/request-user';
import { ResponseNest } from '../common/responses/response-nest';
import { LoginModel, LoginResult, RegisterModel } from './account.models';

@Controller('account')
export class AccountController {

    constructor(
        private readonly _authenticateUseCase: AutenticateUseCase,
        private readonly _registreUseCase: RegisterUseCase,
        private readonly _findUserUseCase: FindUserByIdUseCase
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

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    public async getUserInfo(@Request() req: IRequestWithUser) {

        const { userId } = req.user;

        const user = await this._findUserUseCase.execute(new FindUserByIdUseCaseInput(userId));
        return user;
    }
}