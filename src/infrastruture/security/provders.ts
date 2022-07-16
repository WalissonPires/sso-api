import { Provider } from "@nestjs/common"
import { ITokenGenerator } from "src/app-domain/common/adapters/token-generator.adapter";
import { SecurityConfig } from "./security-config";
import { TokenGenerator } from "./token-generator";


const providers: Provider[] = [
    SecurityConfig,
    {
      provide: ITokenGenerator,
      useClass: TokenGenerator
    }
];

export default providers;