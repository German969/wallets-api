import { IsNumber, IsOptional } from 'class-validator';

export class UpdateRatesDto {
  @IsNumber()
  @IsOptional()
  usd?: number;

  @IsNumber()
  @IsOptional()
  eur?: number;
}
