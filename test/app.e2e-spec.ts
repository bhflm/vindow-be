import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/hotels/internal-search/:name (GET)', () => {
    it('should return an array of internal hotels data', () => {
      return request(app.getHttpServer())
        .get('/hotels/internal-search/HotelName')
        .query({ address: 'HotelAddress' })
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          // Add more assertions based on the expected response
        });
    });

    it('should return an array of internal hotels data when address is not provided', () => {
      return request(app.getHttpServer())
        .get('/hotels/internal-search/HotelName')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          // Add more assertions based on the expected response
        });
    });
  });
});