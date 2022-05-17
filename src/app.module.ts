import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi'; //dependencias de tercero

//import { MongoClient } from 'mongodb';

//----------------------------------------------------------------
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

//INICIAMOS COMO PRIMER EJEMPLO LA PRUEBA A LA CAONEXION DE LA BASE DE DATOS
// const uri = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';

// const client = new MongoClient(uri);
// async function run() {
//   await client.connect();
//   const database = client.db('softwaremp-store');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }
// run();

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
