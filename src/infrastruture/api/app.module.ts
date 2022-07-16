import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RootDir } from 'src/root-dir';
import { AccountController } from './account/account.controller';
import { TokenController } from './token/token.controller';
import typeOrmModule  from '../database';

import securityProviders from "../security/provders";
import repositoriesProviders from "../repositories/provider";
import appDomainProviders from "../../app-domain/providers";
import databaseProviders from "../database/provider";
import { PassportModule } from '@nestjs/passport';
import { JWtStrategy } from './auth/jwt-strategy';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(RootDir.getRootDir(), '..', 'wwwroot'),
    }),
    ConfigModule.forRoot(),
    PassportModule,
    ...typeOrmModule
  ],
  controllers: [ AccountController, TokenController ],
  providers: [
    ...securityProviders,
    ...repositoriesProviders,
    ...appDomainProviders,
    ...databaseProviders,
    JWtStrategy
  ],
})
export class AppModule {}
