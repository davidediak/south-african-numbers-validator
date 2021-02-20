import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';
import { ResultsRepository } from 'src/results/results.repository';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { CsvParserService } from './csv-parser/csv-parser.service';

@Module({
  imports: [CsvModule, TypeOrmModule.forFeature([ResultsRepository])],
  controllers: [ResultsController],
  providers: [ResultsService, CsvParserService],
})
export class ResultsModule {}
