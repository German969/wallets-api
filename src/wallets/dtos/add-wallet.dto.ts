import { IsString } from 'class-validator';

export class AddWalletDto {
  @IsString()
  address: string;
}
