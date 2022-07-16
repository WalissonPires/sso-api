import { Provider } from "@nestjs/common";
import { AutenticateUseCase } from "./user/use-cases/autenticate.usecase";
import { FindUserByEmailPasswordUseCase } from "./user/use-cases/find-user-by-email-passoword.usecase";
import { FindUserByIdUseCase } from "./user/use-cases/find-user-by-id.usecase";
import { RegisterUseCase } from "./user/use-cases/register.usecase";


const providers: Provider[] = [
    FindUserByEmailPasswordUseCase,
    FindUserByIdUseCase,
    AutenticateUseCase,
    RegisterUseCase,
];

export default providers;