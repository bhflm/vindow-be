import { ExternalHotel } from '../interfaces/hotels.interface';
import { normalizeString } from './utils';

interface HotelsDataServiceResponse {
  name: string;
  place_id: string;
  formatted_address: string;
}

function serializeExternalHotel (hotel: HotelsDataServiceResponse): ExternalHotel {
  const { name, place_id, formatted_address } = hotel; 
  return {
    name: normalizeString(name),
    address: normalizeString(formatted_address),
    uid: place_id,
  };
};

export function serializeSearchResponse(dataRecords: HotelsDataServiceResponse[]): ExternalHotel[] {
  return dataRecords.map(serializeExternalHotel);
}