import { Test, TestingModule } from '@nestjs/testing';
import { CsvParser } from 'nest-csv-parser';
import { CsvParserService } from 'src/results/csv-parser/csv-parser.service';
import { ResultsRepository } from 'src/results/results.repository';
import { ResultsService } from './results.service';

describe('ResultsService', () => {
  let service: ResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        ResultsRepository,
        CsvParserService,
        CsvParser,
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
