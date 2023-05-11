import { Body, Controller, Get, Post } from '@nestjs/common';
import { RatesService } from './rates.service';
import { UpdateRatesDto } from './dtos/update-rates.dto';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}

  @Get()
  getRates() {
    return this.ratesService.getRates();
  }

  @Post()
  updateRates(@Body() body: UpdateRatesDto) {
    return this.ratesService.updateRates(body.usd, body.eur);
  }
}
