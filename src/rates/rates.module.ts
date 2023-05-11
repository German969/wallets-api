import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { HttpModule } from '@nestjs/axios';
import { RatesController } from './rates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), HttpModule],
  providers: [RatesService],
  controllers: [RatesController],
})
export class RatesModule {}
