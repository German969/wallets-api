import { IsNumber, IsOptional } from 'class-validator';

export class UpdateWalletBalanceDto {
  @IsNumber()
  @IsOptional()
  balance?: number;
}
