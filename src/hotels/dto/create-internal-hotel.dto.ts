import { InternalHotel } from "../interfaces/hotels.interface";

export class CreateInternalHotelDto {
  readonly name: string;
  readonly address: string;
  readonly rating: number;
  readonly amenities: string[];
}