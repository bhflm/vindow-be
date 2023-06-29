import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Image, ImageSchema } from './image.schema';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Image' }] })
    images: Image[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);