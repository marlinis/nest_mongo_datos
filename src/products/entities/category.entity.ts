import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  //id: number;

  @Prop({ required: true })
  name: string;
}

//Definimos el Schema para Product
export const CategorySchema = SchemaFactory.createForClass(Category);
