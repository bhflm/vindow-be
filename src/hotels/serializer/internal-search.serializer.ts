import { HotelDocument } from '../schemas/hotels.schema';
import { InternalHotel } from '../interfaces/hotels.interface';
import { Image } from '../interfaces/image.interface';
import { normalizeString } from './utils';

function serializeImages(images): Image[] {
  return images.map(({ url, description, width, height}) => ({ url, description, width, height }));
};

function serializeInternalHotel (hotel: HotelDocument): InternalHotel {
  const { name, address, images, _id } = hotel; 
  return {
    uid: _id,
    name: normalizeString(name),
    address: normalizeString(address),
    images: serializeImages(images)
  };
};

export function serializeFindAllResponse(internalSearchResponse: HotelDocument[]): InternalHotel[] {
  return internalSearchResponse.map(serializeInternalHotel);
}