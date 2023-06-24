import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const ImageSchema = SchemaFactory.createForClass(Image);