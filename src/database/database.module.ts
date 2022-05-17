import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoClient } from 'mongodb'; //driver de mongo para coneccion

import config from '../config';

const API_KEY = '12365478';
const API_KEY_PROD = 'PROD12345627';

// CONECTANDO A LA BASE DE DATOS DE MONGO EN NUEVO PROVIDE EN @MODULE
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

@Global()
@Module({
  imports: [
    //   MongooseModule.forRoot('mongodb://localhost:27017', {
    //     user: 'root',
    //     pass: 'root',
    //     dbName: 'softwaremp-store',
    //   }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],

  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        //👈 Inject w/ useFactory
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
