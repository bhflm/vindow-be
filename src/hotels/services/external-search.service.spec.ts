import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSearchService } from './external-search.service';

jest.mock('axios');

describe('ExternalSearchService', () => {
  let service: ExternalSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalSearchService],
    }).compile();

    service = module.get<ExternalSearchService>(ExternalSearchService);
  });

  describe('searchHotels', () => {
    it('should fetch and serialize hotel data from the external API', async () => {
      const hotelName = 'Sheraton';
      const address = 'Pilar';

      const mockApiResponse = {
        data: {
          status: 'OK',
          html_attributions: [],
          results: [
            {
              "business_status": "OPERATIONAL",
              "formatted_address": "San Martín 1225 1275, C1104 CABA, Argentina",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
              "icon_background_color": "#909CE1",
              "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
              "name": "Sheraton Buenos Aires Hotel & Convention Center",
              "photos": [
                {
                  "height": 320,
                  "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/102552147563690516031\">Sheraton Buenos Aires Hotel &amp; Convention Center</a>"
                  ],
                  "photo_reference": "AZose0l4Ownq9gwFO_AOiXl1IhmAtIeF2BO20cOyJVNJF7VfNJF_RXy1g84xVfs0A9FtOmtoYqv9lf6h8CDpgkp3W-h5e15qJHB-dc3ddtOwBOjSU6wdhzA9lwPzSfIQyBZQGonSA-hUg_7ln19AHYfK6yMCBHG6qMB3hydgvIIpv3vfHRc",
                  "width": 480
                }
              ],
              "place_id": "ChIJQS4SGrXKvJURN_6lyZr8cig",
              "user_ratings_total": 10553
            },
            {
              "business_status": "OPERATIONAL",
              "formatted_address": "Panamericana Km 49.5, B1629 Pilar, Provincia de Buenos Aires, Argentina",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
              "icon_background_color": "#909CE1",
              "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
              "name": "Sheraton Pilar Hotel & Convention Center",
              "photos": [
                {
                  "height": 1366,
                  "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/100267519879803618892\">Sheraton Pilar Hotel &amp; Convention Center</a>"
                  ],
                  "photo_reference": "AZose0mhAI5oG7nMpeUVtxAMtUV84_InsoYFGFFXJ57hqn5p_Gpc2DBs5kxCJceVQBPl87zNfBOITvCjXENje9N3WMCjUTFUYzLgOu8Ccv4vwYPXIAo5Ut5uKIFjSa6hjR2YlO1zD-z69oHGkiCMDo7lvTYQHHj0XXcWJehoEIjDKwy_vixu",
                  "width": 2048
                }
              ],
              "place_id": "ChIJX-EuSFCcvJURKIUuJxfjoCQ",
              "user_ratings_total": 5505
            }
          ],
        }
      };

      const mockSerializedResponse = [
        {
          name: 'Sheraton Buenos Aires Hotel & Convention Center',
          address: 'San Martin 1225 1275, C1104 CABA, Argentina',
          uid: 'ChIJQS4SGrXKvJURN_6lyZr8cig'
        },
        {
          name: 'Sheraton Pilar Hotel & Convention Center',
          address: 'Panamericana Km 49.5, B1629 Pilar, Provincia de Buenos Aires, Argentina',
          uid: 'ChIJX-EuSFCcvJURKIUuJxfjoCQ'
        }
      ];

      jest.spyOn(axios, 'get').mockResolvedValue(mockApiResponse);

      const result = await service.searchHotels(hotelName, address);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`query=${hotelName}${address}`)
      );
      expect(result).toEqual(mockSerializedResponse);
    });

    it('should throw an error if the API request fails', async () => {
      const hotelName = 'Sheraton';
      const address = 'Pilar';

      // Mock the axios.get() method to throw an error
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API request failed'));

      await expect(service.searchHotels(hotelName, address)).rejects.toThrowError(
        'Failed to fetch hotel information from the external API.'
      );
    });
  });
});