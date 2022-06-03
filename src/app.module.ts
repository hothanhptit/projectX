import { Injectable, Module } from '@nestjs/common';
import { GqlModuleAsyncOptions, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './modules/users/users.module';
import { join } from 'path';
import depthLimit = require('graphql-depth-limit');
import { ConfigModule } from './structures/config/config.module';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigService } from './structures/config/config.service';
import { Users } from './modules/users/entities/user.entity';

// apollo driver
const graphqlOptions: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  driver: ApolloDriver,
  useFactory: () => ({
    autoSchemaFile: join(process.cwd(), 'schema.gql'),
    playground: true,
    path: 'api',
    validationRules: [depthLimit(6)],
    cors: false,
  }),
};

// if can't inject Config module, add @Global() decorator to module https://stackoverflow.com/questions/59607560/nestjs-typeorm-configuration-works-but-not-with-configservice
// if useFactory has type fault, cast env type to useFactory type
const typeOrmOptions: TypeOrmModuleAsyncOptions[] = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql' as 'mysql',
      host: config.get('MYSQL_HOST'),
      username: config.get('MYSQL_USERNAME'),
      password: config.get('MYSQL_PASSWORD'),
      database: config.get('MYSQL_DATABASE'),
      port: Number(config.get('MYSQL_PORT')),
      synchronize: config.get('SYNC_ENTITIES') == 'true',
      autoLoadEntities: config.get('AUTO_LOAD_ENTITIES') == 'true',
      entities: [Users],
    }),
  },
];
@Injectable()
@Module({
  imports: [
    ConfigModule.register({ folder: './config' }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'schema.gql'),
    //   playground: true,
    //   path: 'api',
    //   validationRules: [depthLimit(6)],
    //   cors: false,
    // }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>(graphqlOptions),
    ...typeOrmOptions.map((options) => TypeOrmModule.forRootAsync(options)),
    UsersModule,
  ],
})
export class AppModule {}
