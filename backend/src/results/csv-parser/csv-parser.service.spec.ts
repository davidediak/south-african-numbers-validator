import { Test, TestingModule } from '@nestjs/testing';
import { CsvParser } from 'nest-csv-parser';
import { CSV_FILE_PATH } from 'src/common/constants';
import { CsvDataDto } from 'src/results/dto/csv-data.dto';
import { CsvParserService } from './csv-parser.service';

describe('CsvParserService', () => {
  let service: CsvParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvParserService, CsvParser],
    }).compile();

    service = module.get<CsvParserService>(CsvParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse the data.csv file', async () => {
    const parsedData = await service.doParse(CSV_FILE_PATH, CsvDataDto);
    expect(parsedData).toEqual(
      expect.objectContaining({
        list: expect.any(Array),
      }),
    );

    expect(parsedData.list).not.toHaveLength(0);
  });

  it('should fail', async () => {
    const action = async () => {
      await service.doParse('not/valid/path', CsvDataDto);
    };

    await expect(action()).rejects.toThrow();
  });

  it('should sanitize a sting', async () => {
    expect(service.sanitizeSting(`���test`)).toBe(`test`);
    expect(service.sanitizeSting(`test`)).toBe(`test`);
  });
});
