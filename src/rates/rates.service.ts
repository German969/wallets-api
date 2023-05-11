import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Rate } from './rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate) private repo: Repository<Rate>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getRates() {
    const rates = await this.repo.find();

    if (!rates.length) {
      await this.updateRates();
    }

    const updatedRates = await this.repo.find();

    return {
      usd: updatedRates.find((rate) => rate.currency == 'USD').rate || null,
      eur: updatedRates.find((rate) => rate.currency == 'EUR').rate || null,
    };
  }

  async getEthExchangeRate() {
    const apiUrl = this.configService.get<string>('API_URL');
    const apiKey = this.configService.get<string>('API_KEY');

    const ethRatesParams = {
      module: 'stats',
      action: 'ethprice',
      apiKey,
    };

    const { data } = await firstValueFrom(
      this.httpService.get(apiUrl, { params: ethRatesParams }),
    );

    return data.result;
  }

  async updateRates(usd?: number, eur?: number) {
    if (usd) {
      await this.repo.save({
        currency: 'USD',
        rate: usd,
      });
    }

    if (eur) {
      await this.repo.save({
        currency: 'EUR',
        rate: eur,
      });
    }

    if (!usd && !eur) {
      const newRateResponse = await this.getEthExchangeRate();

      const newRate = Number(newRateResponse.ethusd);

      await this.repo.save({
        currency: 'USD',
        rate: newRate,
      });

      const usdEurRate = this.configService.get<number>('USD_EUR_RATE');

      await this.repo.save({
        currency: 'EUR',
        rate: newRate * usdEurRate,
      });
    }
  }
}
