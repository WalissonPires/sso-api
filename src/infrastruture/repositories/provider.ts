import { Provider } from "@nestjs/common"
import { IUserRepository } from "src/app-domain/common/adapters/user-repository.adapter";
import { BaseRepositoryFactory } from "./base-repository";
import { UserRepository } from "./user/user-repository";


const providers: Provider[] = [
    BaseRepositoryFactory,
    {
        provide: IUserRepository,
        useClass: UserRepository
    }
];

export default providers;