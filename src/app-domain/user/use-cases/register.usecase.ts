import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/app-domain/common/adapters/user-repository.adapter";
import { IUseCase } from "src/app-domain/common/use-cases";
import { User } from "../entities/user";


@Injectable()
export class RegisterUseCase implements IUseCase<RegisterUseCaseInput, RegisterUseCaseUseCaseResult> {

    constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}

    public async execute(input: RegisterUseCaseInput): Promise<RegisterUseCaseUseCaseResult> {

        const user = new User(null);
        user.name = input.name;
        user.email = input.email;
        user.password = input.password;

        await this._userRepo.add(user);

        return new RegisterUseCaseUseCaseResult(true);
    }

}


export class RegisterUseCaseInput {
    constructor(public name: string, public email: string, public password: string, public confirmPassword: string) {

    }
}

export class RegisterUseCaseUseCaseResult {

    public errorMessage: string | null = null;

    constructor(public sucesss: boolean) {}
}