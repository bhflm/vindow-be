import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from './hotels.schema';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop({ type: Types.ObjectId, ref: 'Hotel' })
  hotel: Types.ObjectId;
}

export const ImageSchema = SchemaFactory.createForClass(Image);