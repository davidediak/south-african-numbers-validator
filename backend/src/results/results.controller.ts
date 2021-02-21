import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { Outcome } from 'src/common/interfaces';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('parse')
  async parseCsv() {
    await this.resultsService.truncate();
    const parsedData = await this.resultsService.parseDataFile();
    return this.resultsService.createWithParsedData(parsedData);
  }

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Get('filter/outcome/:outcome')
  filterByOutcome(@Param('outcome') outcome: Outcome) {
    return this.resultsService.filterByOutcome(outcome);
  }

  @Get('validate/:number')
  validateSingleNumber(@Param('number') number: string) {
    return this.resultsService.validateNumber(number);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
