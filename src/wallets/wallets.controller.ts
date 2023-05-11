import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { AddWalletDto } from './dtos/add-wallet.dto';
import { UpdateWalletBalanceDto } from './dtos/update-wallet-balance.dto';

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

  @Patch('/:id/balance')
  updateWalletBalance(
    @Param('id') id: string,
    @Body() body: UpdateWalletBalanceDto,
  ) {
    return this.walletsService.updateAccountBalance(id, body.balance);
  }

  @Patch('/:id/favourite')
  toggleAccountFavourite(@Param('id') id: string) {
    return this.walletsService.toggleWalletFavourite(id);
  }
}
