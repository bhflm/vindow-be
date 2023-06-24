import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { serializeSearchResponse } from '../serializer/external-search.serializer';

@Injectable()
export class ExternalSearchService {
  private readonly API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  private readonly GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place'

  // https://maps.googleapis.com/maps/api/place/textsearch/output?parameters
  async searchHotels(hotelName: string, address = null): Promise<any> {
    const baseUrl = `${this.GOOGLE_PLACES_API_URL}/textsearch/json`;

    const query = `query=${encodeURIComponent(hotelName + (address && ' ' + address))}`;

    const url = `${baseUrl}?${query}&key=${this.API_KEY}`;

    try {
      const { data } = await axios.get(url);
      const [ externalHotelResponse ] = serializeSearchResponse(data);
      return externalHotelResponse;
    } catch (error) {
      throw new Error('Failed to fetch hotel information from the external API.');
    }
  }
}