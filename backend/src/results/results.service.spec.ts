import { Test, TestingModule } from '@nestjs/testing';
import { CsvParser } from 'nest-csv-parser';
import { Outcome } from 'src/common/interfaces';
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

  it('valid number should be Accepted', () => {
    expect(service.validateNumber('27845878676')).toEqual(
      expect.objectContaining({
        outcome: Outcome.Accepted,
      }),
    );
  });

  it('valid number with spaces should be Corrected', () => {
    expect(service.validateNumber('2782 323 6124 ')).toEqual(
      expect.objectContaining({
        outcome: Outcome.Corrected,
      }),
    );
  });

  it('valid number as continuous substring should be Corrected', () => {
    expect(service.validateNumber('HELLO_27788450119_THIS_IS_AT3ST')).toEqual(
      expect.objectContaining({
        outcome: Outcome.Corrected,
      }),
    );
  });

  it('number with 10 digits should be Rejected', () => {
    expect(service.validateNumber('2777183518')).toEqual(
      expect.objectContaining({
        outcome: Outcome.Rejected,
      }),
    );
  });

  it('valid number but with non-numeric noise in between should be Rejected', () => {
    expect(service.validateNumber('278458:(78676')).toEqual(
      expect.objectContaining({
        outcome: Outcome.Rejected,
      }),
    );
  });
});
