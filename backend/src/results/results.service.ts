import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultEntity } from 'src/results/entities/result.entity';
import { ResultsRepository } from 'src/results/results.repository';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(ResultsRepository)
    private resultsRepository: ResultsRepository,
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

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  public async remove(ResultId: number): Promise<void> {
    await this.resultsRepository.delete(ResultId);
  }
}
