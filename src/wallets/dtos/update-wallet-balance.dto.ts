import { IsString } from 'class-validator';

export class UpdateWalletBalanceDto {
  @IsString()
  address: string;
}
