import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSearchController } from './external-search.controller';
import { ExternalSearchService } from '../services/external-search.service';

describe('ExternalSearch Controller', () => {
  let controller: ExternalSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalSearchController],
      providers: [ExternalSearchService],
    }).compile();

    controller = module.get<ExternalSearchController>(ExternalSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
