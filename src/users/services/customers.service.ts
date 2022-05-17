import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  // private counterId = 1;
  // private customers: Customer[] = [
  //   {
  //     id: 1,
  //     name: 'Marlon',
  //     lastName: 'Peralta',
  //     phone: '50582194628',
  //   },
  // ];

  findAll() {
    return this.customerModel.find().exec();
  }

  findOne(id: string) {
    const customer = this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    console.log(data);
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    const customer = this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  remove(id: string) {
    const customer = this.customerModel.findByIdAndDelete(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }
}
