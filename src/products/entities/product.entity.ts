import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  //id: number; en el caso de mongo no se necesita un id, ya que se genera automaticamente
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  //estableciendo relación 1 a 1 embebida
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  //relacion referenciada 1:1
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

//Definimos el Schema para Product
export const ProductSchema = SchemaFactory.createForClass(Product);

//definiendo indexados compuestos en mongoose
ProductSchema.index({ price: 1, stock: -1 }, { unique: true });
