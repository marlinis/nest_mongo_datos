import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  //id: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  image: string;
}

//Definimos el Schema para Brand
export const BrandSchema = SchemaFactory.createForClass(Brand);
