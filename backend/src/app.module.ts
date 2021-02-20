import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
