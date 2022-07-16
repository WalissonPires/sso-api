import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

const root = TypeOrmModule.forRoot({
    type: 'postgres',
    entities: [ User ],
    synchronize: true,
    logger: 'advanced-console',
    url: process.env.DATABASE_URL || 'postgres://postgres:masterkey@localhost:5432/sso-app',
});

export default [ root ];