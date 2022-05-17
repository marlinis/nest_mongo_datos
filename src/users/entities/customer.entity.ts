import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer {
  //id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({
    type: [{ name: { type: String }, color: { type: String } }], //array embebidos,
  })
  skills: Types.Array<Record<string, any>>; // 👈 field
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
