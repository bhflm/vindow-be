import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { InternalSearchService } from './internal-search.service';
import { Hotel, HotelDocument } from '../schemas/hotels.schema';
import { Image } from '../schemas/image.schema';
import { InternalHotel } from '../interfaces/hotels.interface';

describe('InternalSearchService', () => {
  let internalSearchService: InternalSearchService;
  let hotelModel: Model<HotelDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InternalSearchService,
        {
          provide: getModelToken(Hotel.name),
          useValue: Model,
        },
      ],
    }).compile();

    internalSearchService = moduleRef.get<InternalSearchService>(InternalSearchService);
    hotelModel = moduleRef.get<Model<HotelDocument>>(getModelToken(Hotel.name));
  });

  describe('findAll', () => {
    it('should return an array of InternalHotel', async () => {
      const hotelName = 'sheraton';

      const mockId = new Types.ObjectId();
      const mockImg =  {
        height: 100,
        width: 100,
        url: 'foo.bar',
        description: 'description'
      };
      const mockImages: Image[] = [
        {
          ...mockImg,
          hotel: mockId
        },
      ];

      const mockHotelDocuments: HotelDocument[] = [
        {
          _id: mockId,
          name: 'Mock Hotel',
          address: 'Mock address',
          images: mockImages,
        } as HotelDocument,
      ];

      const queryFilter = { name: { $regex: new RegExp(hotelName, 'i') } };

      jest.spyOn(hotelModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockHotelDocuments),
      } as any);

      const result = await internalSearchService.findAll(hotelName);

      const serializedMockResponse: InternalHotel[] = [{
          uid: mockId as unknown as string,
          name: 'Mock Hotel',
          address: 'Mock address',
          images: [mockImg],
      }]

      expect(result).toEqual(serializedMockResponse);
      expect(hotelModel.find).toHaveBeenCalledWith(queryFilter);
    });

    it('should return empty array if no hotels match the query', async () => {
      jest.spyOn(hotelModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await internalSearchService.findAll('someHotel');

      expect(result).toEqual([]);
      expect(hotelModel.find).toHaveBeenCalledWith({ name: { $regex: new RegExp('someHotel', 'i') } });
    });

    it('should return an array of InternalHotel when address is provided', async () => {
      const mockId = new Types.ObjectId();

      const mockHotelA = {
        _id: 'mockId1',
        name: 'Hotel 1',
        address: 'Address 1',
        images: [{
          height: 100,
          width: 100,
          url: 'foo.bar',
          description: 'description',
          hotel: mockId
        }],
      };

      const mockHotelB = {
        _id: 'mockId2',
        name: 'Hotel 2',
        address: 'Address 2',
        images: [],
      }

      const mockHotelDocuments: HotelDocument[] = [
        mockHotelA as HotelDocument,
        mockHotelB as HotelDocument,
      ];

      const queryFilter = {
        name: { $regex: new RegExp('Hotel', 'i') },
        address: { $regex: new RegExp('Address 2', 'i') },
      };

      jest.spyOn(hotelModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockHotelDocuments[1]]),
      } as any);

      const result = await internalSearchService.findAll('Hotel', 'Address 2');

      expect(result).toEqual([
        {
          uid: mockHotelB._id,
          name: mockHotelB.name,
          address: mockHotelB.address,
          images: mockHotelB.images,
        },
      ]);
      expect(hotelModel.find).toHaveBeenCalledWith(queryFilter);
    });
  });
});