import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
    @Prop()
    name: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);