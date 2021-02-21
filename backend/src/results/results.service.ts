import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultEntity } from 'src/results/entities/result.entity';
import { ResultsRepository } from 'src/results/results.repository';
import { CreateResultDto } from './dto/create-result.dto';
import { CsvDataDto } from './dto/csv-data.dto';
import { CsvParserService } from 'src/results/csv-parser/csv-parser.service';
import { ParsedData } from 'nest-csv-parser';
import {
  CSV_FILE_PATH,
  FIND_VALID_NUMBER_IN_STRING_REGEX,
  SOUTH_AFRICA_CONTRY_CODE,
  SOUTH_AFRICA_NUMBER_LENGTH,
} from 'src/common/constants';
import { Outcome, rejectionReasons } from 'src/common/interfaces';
import { ValueOf } from 'src/common/util-types';

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

  public async filterByOutcome(outcome: Outcome): Promise<ResultEntity[]> {
    const possibleOutcomes = Object.values(Outcome);

    if (possibleOutcomes.includes(outcome)) {
      return await this.resultsRepository.find({ where: { outcome } });
    } else {
      throw new NotAcceptableException(
        `Provided outcome param is not valid. Please use one of these values: ${possibleOutcomes}`,
      );
    }
  }

  public async remove(ResultId: number): Promise<void> {
    await this.resultsRepository.delete(ResultId);
  }

  public async truncate(): Promise<void> {
    await this.resultsRepository.clear();
  }

  public async parseDataFile(): Promise<ParsedData<CsvDataDto>> {
    try {
      const parsedData = await this.csvParserService.doParse(
        CSV_FILE_PATH,
        CsvDataDto,
      );

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
        const { outcome, correctedValue } = this.validateNumber(originalValue);

        await this.create({
          outcome,
          originalId,
          originalValue,
          correctedValue,
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error while popolation results table with parsed data',
      );
    }
  }

  public validateNumber(
    numberAsString: string,
  ): {
    outcome: Outcome;
    correctedValue?: string;
    rejectionReason?: ValueOf<typeof rejectionReasons>;
  } {
    const convertedNumber = +numberAsString;

    if (isNaN(convertedNumber)) {
      const validNumberFoundAsSubstring = numberAsString
        .match(FIND_VALID_NUMBER_IN_STRING_REGEX)
        ?.join('');

      if (validNumberFoundAsSubstring) {
        return {
          outcome: Outcome.Corrected,
          correctedValue: validNumberFoundAsSubstring,
        };
      } else {
        return {
          outcome: Outcome.Rejected,
          rejectionReason: rejectionReasons.NAN,
        };
      }
    } else if (numberAsString.length !== SOUTH_AFRICA_NUMBER_LENGTH) {
      return {
        outcome: Outcome.Rejected,
        rejectionReason: rejectionReasons.WrongLength,
      };
    } else if (numberAsString.substring(0, 2) !== SOUTH_AFRICA_CONTRY_CODE) {
      return {
        outcome: Outcome.Rejected,
        rejectionReason: rejectionReasons.WrongCountryCode,
      };
    } else {
      return { outcome: Outcome.Accepted };
    }
  }
}
