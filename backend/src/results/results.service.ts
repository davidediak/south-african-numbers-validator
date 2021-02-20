import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultEntity } from 'src/results/entities/result.entity';
import { ResultsRepository } from 'src/results/results.repository';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { CsvDataDto } from './dto/csv-data.dto';
import { CsvParserService } from 'src/results/csv-parser/csv-parser.service';
import { ParsedData } from 'nest-csv-parser';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(ResultsRepository)
    private resultsRepository: ResultsRepository,
    private csvParserService: CsvParserService,
  ) {}

  public async create(createResultDto: CreateResultDto): Promise<ResultEntity> {
    try {
      return await this.resultsRepository.createResult(createResultDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<ResultEntity[]> {
    return await this.resultsRepository.findAll();
  }

  public async findOne(ResultId: number): Promise<ResultEntity> {
    const Result = await this.resultsRepository.findById(ResultId);
    if (!Result) {
      throw new NotFoundException(`Result #${ResultId} not found`);
    }
    return Result;
  }

  public update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  public async remove(ResultId: number): Promise<void> {
    await this.resultsRepository.delete(ResultId);
  }

  public async parseDataFile(): Promise<ParsedData<CsvDataDto>> {
    try {
      const path = './data.csv';
      const parsedData = await this.csvParserService.doParse(path, CsvDataDto);

      return parsedData;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error while parsing');
    }
  }

  public async createWithParsedData(
    parsedData: ParsedData<CsvDataDto>,
  ): Promise<boolean> {
    try {
      for (const parsedDataLine of parsedData.list) {
        const originalId = parsedDataLine.id;
        const originalValue = parsedDataLine.sms_phone;
        const outcome = this.validateNumber(originalValue);

        await this.create({ outcome, originalId, originalValue });
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error while popolation results table with parsed data',
      );
    }
  }

  private validateNumber(
    number: string,
  ): 'accepted' | 'rejected' | 'corrected' {
    if (isNaN(+number)) {
      return 'rejected';
    } else {
      return 'accepted';
    }
  }
}
