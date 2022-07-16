import { Inject, Injectable } from '@nestjs/common';
import { FindById, IUserRepository } from 'src/app-domain/common/adapters/user-repository.adapter';
import { IUseCase } from 'src/app-domain/common/use-cases';
import { User } from '../entities/user';

@Injectable()
export class FindUserByIdUseCase implements IUseCase<FindUserByIdUseCaseInput, FindUserByIdUseCaseResult | null> {

    constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}

    public async execute(input: FindUserByIdUseCaseInput): Promise<FindUserByIdUseCaseResult | null> {

        const user = await this._userRepo.findBySpec(new FindById(input.id));

        if (user)
            return new FindUserByIdUseCaseResult(user.id, user.name, user.email);

        return null;
    }
}

export class FindUserByIdUseCaseInput {
    constructor(public id: string) { }
}

export class FindUserByIdUseCaseResult extends User {
    constructor(public id: string, public name: string, public email: string) {
        super(id);
    }
}
