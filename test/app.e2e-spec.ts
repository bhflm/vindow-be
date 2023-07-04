import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { 
  MissingAPIKeyErrorMessage,
  InvalidAPIKeyErrorMessage
} from '../src/errors/constants';

import { ExternalSearchController } from '../src/hotels/controllers/external-search.controller';
import { ExternalSearchService } from '../src/hotels/services/external-search.service';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (Integration)', () => {
  let app: INestApplication;

  const mockExternalSearchService = {
    searchHotels: jest.fn().mockResolvedValue(
       [
      {
        name: "Sheraton Pilar Hotel & Convention Center",
        address: "Panamericana Km 49.5, B1629 Pilar, Provincia de Buenos Aires, Argentina",
        uid: "ChIJX-EuSFCcvJURKIUuJxfjoCQ"
      }
    ]
    ),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ExternalSearchController],
      providers: [
        {
          provide: ExternalSearchService,
          useValue: mockExternalSearchService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/hotels', () => {
    const validAPIKeyHeader = {'x-api-key': 'VindowTravel'};

    describe('/hotels/internal-search/:name (GET)', () => {

      it('should not return response when api key is not present', async () => {
          const response = await request(app.getHttpServer())
          .get('/hotels/internal-search/sheraton')
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(MissingAPIKeyErrorMessage)
      });

      it('should not return response without valid api key', async () => {
          const response = await request(app.getHttpServer())
          .get('/hotels/internal-search/sheraton')
          .set({'x-api-key': 'invalidHeader'});

          expect(response.statusCode).toBe(401);
          expect(response.body.message).toBe(InvalidAPIKeyErrorMessage)
        });


      it('should error without hotel parameter, its a different resource', async () => {
        const response = await request(app.getHttpServer())
        .get('/hotels/internal-search/')
        .set(validAPIKeyHeader)
              
        expect(response.statusCode).toBe(404);
      });

      it('should return array of hotels with address from query', async () => {
        const queryAddress = 'Pilar';

        const response = await request(app.getHttpServer())
        .get('/hotels/internal-search/sheraton')
        .set(validAPIKeyHeader)
        .query({ address: queryAddress });
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        
        const [oneHotel] = response.body
        expect(oneHotel.address).toContain(queryAddress)
      });

      it('should return array of hotels with address without query', async () => {
        const response = await request(app.getHttpServer())
        .get('/hotels/internal-search/sheraton')
        .set(validAPIKeyHeader);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  
    describe('/hotels/external-search/:name (GET)', () => {

      it('should error without hotel parameter, its a different resource', async () => {
        const response = await request(app.getHttpServer())
        .get('/hotels/external-search/')
        .set(validAPIKeyHeader)

        expect(response.statusCode).toBe(404);
      });

      it('should return array of hotels', async () => {
        const response = await request(app.getHttpServer())
        .get('/hotels/external-search/sheraton')
        .set(validAPIKeyHeader)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(mockExternalSearchService.searchHotels).toHaveBeenCalledWith('sheraton');
      });

      it('should return array of hotels with query', async () => {
        const queryAddress = 'Pilar';

        const response = await request(app.getHttpServer())
        .get('/hotels/external-search/sheraton')
        .set(validAPIKeyHeader)
        .query({ address: queryAddress });

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(mockExternalSearchService.searchHotels).toHaveBeenCalledWith('sheraton', queryAddress);
        expect(response.body.some(h => h.address.includes(queryAddress)));

        });
      });
    });
    });
  });