import { Inject, Injectable } from '@nestjs/common';
import { FindByEmailAndPasswordSpec, IUserRepository } from 'src/app-domain/common/adapters/user-repository.adapter';
import { IUseCase } from 'src/app-domain/common/use-cases';

@Injectable()
export class FindUserByEmailPasswordUseCase implements IUseCase<FindUserByEmailPasswordUseCaseInput, FindUserByEmailPasswordUseCaseResult | null> {

    constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}

    public async execute(input: FindUserByEmailPasswordUseCaseInput): Promise<FindUserByEmailPasswordUseCaseResult | null> {

        const user = await this._userRepo.findBySpec(new FindByEmailAndPasswordSpec(input.email, input.password));

        if (user)
            return new FindUserByEmailPasswordUseCaseResult(user.id);

        return null;
    }
}

export class FindUserByEmailPasswordUseCaseInput {
    constructor(public email: string, public password: string) { }
}

export class FindUserByEmailPasswordUseCaseResult {
    constructor(public userId: string) { }
}
