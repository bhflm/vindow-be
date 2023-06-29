import { ExternalHotel } from '../interfaces/hotels.interface';
import { normalizeString } from './utils';
interface HotelsDataServiceResponse {
  name: string;
  place_id: string;
  formatted_address: string;
}

interface ExternalServiceResponse {
  results: HotelsDataServiceResponse[]
}

function serializeExternalHotel (hotel: HotelsDataServiceResponse): ExternalHotel {
  const { name, place_id, formatted_address } = hotel; 
  return {
    name: normalizeString(name),
    address: normalizeString(formatted_address),
    uid: place_id,
  };
};

export function serializeSearchResponse(externalSearchResponse: ExternalServiceResponse): ExternalHotel[] {
  const { results } = externalSearchResponse;
  return results.map(serializeExternalHotel);
}