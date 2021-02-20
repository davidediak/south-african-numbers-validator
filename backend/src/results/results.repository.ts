import { CreateResultDto } from 'src/results/dto/create-result.dto';
import { ResultEntity } from 'src/results/entities/result.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(ResultEntity)
export class ResultsRepository extends Repository<ResultEntity> {
  public async findAll(): Promise<ResultEntity[]> {
    return await this.find({});
  }

  public async findById(resultId: number): Promise<ResultEntity> {
    return await this.findOne(resultId);
  }

  public async createResult(
    createResultDto: CreateResultDto,
  ): Promise<ResultEntity> {
    const {
      outcome,
      originalId,
      originalValue,
      correctedValue,
    } = createResultDto;
    const result = new ResultEntity();
    result.outcome = outcome;
    result.originalId = originalId;
    result.originalValue = originalValue;
    result.correctedValue = correctedValue;

    await this.save(result);
    return result;
  }

  public async destroy(resultId: number): Promise<void> {
    const result = await this.findOne(resultId);
    await this.remove(result);
  }
}
