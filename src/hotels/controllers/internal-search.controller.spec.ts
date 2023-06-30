import { Test, TestingModule } from '@nestjs/testing';
import { InternalSearchController } from './internal-search.controller';
import { InternalSearchService } from '../services/internal-search.service';

describe('InternalSearchController', () => {
  let controller: InternalSearchController;
  let service: InternalSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalSearchController],
      providers: [
        {
          provide: InternalSearchService,
          useValue: {
            findAll: jest.fn(),
          }
        }
      ],
    }).compile();

    controller = module.get<InternalSearchController>(InternalSearchController);
    service = module.get<InternalSearchService>(InternalSearchService);
  });

  describe('search', () => {
    it('should call InternalSearchService findAll method with correct params', () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const hotel = 'Sheraton';
      const address = 'Pilar';

      controller.search(hotel, address);

      expect(findAllSpy).toHaveBeenCalledWith(hotel, address);
    });

    it('should call InternalSearchService findAll method with second param missing', () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const hotel = 'Sheraton';

      controller.search(hotel);

      expect(findAllSpy).toHaveBeenCalledWith(hotel);
    });

    it('should call InternalSearchService findAll method with empty string as hotel and one param', () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const address = 'Miramar';

      controller.search('', address);

      expect(findAllSpy).toHaveBeenCalledWith('', address);
    });
  });
});