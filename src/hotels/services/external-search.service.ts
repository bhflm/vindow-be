import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ExternalHotel } from '../interfaces/./hotels.interface'
import { serializeSearchResponse } from '../serializer/external-search.serializer';

@Injectable()
export class ExternalSearchService {
  private readonly API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  private readonly GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place'

  // https://maps.googleapis.com/maps/api/place/textsearch/output?parameters
  async searchHotels(hotelName: string, address: string = null): Promise<ExternalHotel[]> {
    const baseUrl = `${this.GOOGLE_PLACES_API_URL}/textsearch/json`;

    const qs = address ? hotelName + address : hotelName;

    const query = `query=${encodeURIComponent(qs)}`;

    const url = `${baseUrl}?${query}&key=${this.API_KEY}`;

    try {
      const { data } = await axios.get(url);
      const { results } = data;
      const externalHotelsResponse = serializeSearchResponse(results);
      return externalHotelsResponse;
    } catch (error) {
      throw new Error('Failed to fetch hotel information from the external API.');
    }
  }
}