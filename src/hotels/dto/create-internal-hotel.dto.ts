import { InternalHotel } from "../interfaces/hotels.interface";
export class CreateInternalHotelDto implements InternalHotel {
  readonly name: string;
  readonly address: string;
}
