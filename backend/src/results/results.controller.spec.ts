import { Test, TestingModule } from '@nestjs/testing';
import { CsvParser } from 'nest-csv-parser';
import { CsvParserService } from 'src/results/csv-parser/csv-parser.service';
import { ResultsRepository } from 'src/results/results.repository';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';

describe('ResultsController', () => {
  let controller: ResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultsController],
      providers: [
        ResultsService,
        ResultsRepository,
        CsvParserService,
        CsvParser,
      ],
    }).compile();

    controller = module.get<ResultsController>(ResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
