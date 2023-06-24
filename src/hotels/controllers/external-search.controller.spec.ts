import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSearchController } from './external-search.controller';
import { ExternalSearchService } from '../services/external-search.service';

describe('ExternalSearchController', () => {
  let controller: ExternalSearchController;
  let service: ExternalSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalSearchController],
      providers: [ExternalSearchService],
    }).compile();

    controller = module.get<ExternalSearchController>(ExternalSearchController);
    service = module.get<ExternalSearchService>(ExternalSearchService);
  });

  describe('search', () => {
    it('should return one hotel based by name', async () => {

      const hotel = 'Sheraton';

      const expectedResult = {
        name: "Sheraton Buenos Aires Hotel & Convention Center",
        address: "San Martin 1225 1275, C1104 CABA, Argentina",
        uid: "ChIJQS4SGrXKvJURN_6lyZr8cig"
      };

      jest.spyOn(service, 'searchHotels').mockResolvedValue(expectedResult);

      const result = await controller.search(hotel);

      expect(service.searchHotels).toHaveBeenCalledWith(hotel);
      expect(result).toBe(expectedResult);
    });


    it('should return one hotel from many based by address', async () => {

      const hotel = 'Sheraton';
      const address = 'pilar';

      const expectedResult = {
        name: "Sheraton Pilar Hotel & Convention Center",
        address: "Panamericana Km 49.5, B1629 Pilar, Provincia de Buenos Aires, Argentina",
        uid: "ChIJX-EuSFCcvJURKIUuJxfjoCQ"
      };

      jest.spyOn(service, 'searchHotels').mockResolvedValue(expectedResult);

      const result = await controller.search(hotel, address);

      expect(service.searchHotels).toHaveBeenCalledWith(hotel, address);
      expect(result).toBe(expectedResult);
    });

    it('should throw error if searchHotels errors too', async () => {

      const hotel = 'Sheraton';
      const error = new Error('Search hotels failed');
      jest.spyOn(service, 'searchHotels').mockRejectedValue(error);

      await expect(controller.search(hotel)).rejects.toThrowError();
    });
  });
});