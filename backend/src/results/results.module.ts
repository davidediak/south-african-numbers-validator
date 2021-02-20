import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsRepository } from 'src/results/results.repository';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResultsRepository])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
