import { User } from "src/app-domain/user/entities/user";



export const IUserRepository = Symbol('app-domain.common.adapters.user-repository');

export interface IUserRepository {

    add(user: User): Promise<User>;
    findBySpec(input: FindUserBySpec): Promise<User>;
}

export class FindByEmailAndPasswordSpec implements FindUserBySpec {

    constructor(public email: string, public password: string) {

    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FindUserBySpec {}