import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { AddWalletDto } from './dtos/add-wallet.dto';
import { UpdateWalletBalanceDto } from './dtos/update-wallet-balance.dto';
import { ToggleWalletFavouriteDto } from './dtos/toggle-wallet-favourite.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Post()
  addWallet(@Body() body: AddWalletDto) {
    return this.walletsService.addWallet(body.address);
  }

  @Get()
  getWallets() {
    return this.walletsService.getAllWallets();
  }

  @Patch()
  updateWalletBalance(@Body() body: UpdateWalletBalanceDto) {
    return this.walletsService.updateAccountBalance(body.address);
  }

  @Patch()
  toggleAccountFavourite(@Body() body: ToggleWalletFavouriteDto) {
    return this.walletsService.toggleWalletFavourite(body.address);
  }
}
