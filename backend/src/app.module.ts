import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ResultsModule],
})
export class AppModule {}
