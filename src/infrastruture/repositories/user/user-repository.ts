import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { FindByEmailAndPasswordSpec, FindById, FindUserBySpec, IUserRepository } from "src/app-domain/common/adapters/user-repository.adapter";
import { User } from "src/app-domain/user/entities/user";
import { BaseRepository, BaseRepositoryFactory } from "src/infrastruture/repositories/base-repository";
import { User as UserEntity } from "src/infrastruture/database/entities/user.entity";

@Injectable()
export class UserRepository implements IUserRepository {

    private readonly _repository: BaseRepository<UserEntity>;

    constructor(baseRepositoryFactory: BaseRepositoryFactory) {

        this._repository = baseRepositoryFactory.create(UserEntity);
    }

    public async add(user: User): Promise<User> {

        const userEntity = new UserEntity();
        userEntity.id = uuidV4();
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.created_at = new Date();
        userEntity.updated_at = new Date();

        await this._repository.save(userEntity);

        return user;
    }

    public async findBySpec(spec: FindUserBySpec): Promise<User | null> {

        let usersEntity: UserEntity[];

        if (spec instanceof FindByEmailAndPasswordSpec) {
            usersEntity = await this._repository.findBy({ email: spec.email, password: spec.password });
        }
        else if (spec instanceof FindById) {
            usersEntity = await this._repository.findBy({ id: spec.id });
        }
        else
            throw new Error('Spec não implementada');

        if (usersEntity.length === 0)
            return null;

        const { id, name, email } = usersEntity[0];
        const user = new User(id);
        user.name = name;
        user.email = email;
        user.password = null;

        return Promise.resolve(user);
    }
}