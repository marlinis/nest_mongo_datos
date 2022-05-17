import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import * as bcrypt from 'bcrypt';

import { Db } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    //@Inject('MONGO') private database: Db, //Injectcion de conexion a mongo
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  // private counterId = 1;
  // private users: User[] = [
  //   {
  //     id: 1,
  //     email: 'correo@mail.com',
  //     password: '12345',
  //     role: 'admin',
  //   },
  // ];

  findAll() {
    //return this.users;
    //const tasksCollection = this.database.collection('user');
    //return tasksCollection.find().toArray();

    return this.userModel.find().exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  //METODO PARA BUSCAR POR EMAIL
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPasswords = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPasswords;
    const passUser = await newUser.save();
    const { password, ...resp } = passUser.toJSON();

    return resp;
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return user;
  }
}
