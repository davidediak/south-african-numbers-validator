import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
