import { Test, TestingModule } from '@nestjs/testing';
import { InternalSearchController } from './internal-search.controller';
import { InternalSearchService } from '../services/internal-search.service';

describe('InternalSearch Controller', () => {
  let controller: InternalSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalSearchController],
      providers: [InternalSearchService],
    }).compile();

    controller = module.get<InternalSearchController>(InternalSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
