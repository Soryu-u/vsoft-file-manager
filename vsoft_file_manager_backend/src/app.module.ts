import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: 'schema.gql',
          sortSchema: true,
          playground: true
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          type: 'postgres' as 'postgres',
          host: config.get<string>('TYPEORM_HOST'),
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE'),
          port: config.get<number>('TYPEORM_PORT'),
          entities: [ __dirname + 'dist/**/*.entity{.ts,.js}' ],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        }),
      }),
      UsersModule,
  ],
  providers: [],
})
export class AppModule {
    configure(consumer: any) {
        const app = express();
        app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
        consumer(app);
    }
}
