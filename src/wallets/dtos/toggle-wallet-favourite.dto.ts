import { IsString } from 'class-validator';

export class ToggleWalletFavouriteDto {
  @IsString()
  address: string;
}
