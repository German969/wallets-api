import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private repo: Repository<Wallet>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async addWallet(address: string) {
    if (await this.repo.findOneBy({ address })) {
      throw new BadRequestException('Address aready exists');
    }

    const accountBalance = await this.getAddressAmount(address);

    if (accountBalance == -1) {
      throw new BadRequestException();
    }

    const firstTransactionDate = await this.getAddressFirstTransaction(address);

    const newWallet = this.repo.create({
      address,
      favourite: false,
      amount: accountBalance,
      firstTransactionDate,
    });

    return this.repo.save(newWallet);
  }

  async getAddressAmount(address: string) {
    const apiUrl = this.configService.get<string>('API_URL');
    const apiKey = this.configService.get<string>('API_KEY');

    const WEI_CONVERSION = 1000000000000000000;

    const accountBalanceParams = {
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apiKey,
    };

    const { data } = await firstValueFrom(
      this.httpService.get(apiUrl, { params: accountBalanceParams }),
    );

    const amount = data.status == '1' ? data.result / WEI_CONVERSION : -1;

    return amount;
  }

  async getAddressFirstTransaction(address: string) {
    const apiUrl = this.configService.get<string>('API_URL');
    const apiKey = this.configService.get<string>('API_KEY');

    const latestBlockParams = {
      module: 'proxy',
      action: 'eth_blockNumber',
      apiKey,
    };

    const { data: latestResult } = await firstValueFrom(
      this.httpService.get(apiUrl, { params: latestBlockParams }),
    );

    const latestBlockNumber = parseInt(latestResult.result, 16);

    const txListParams = {
      module: 'account',
      action: 'txlist',
      address,
      startblock: 0,
      endblock: latestBlockNumber,
      page: 0,
      offset: 0,
      sort: 'asc',
      apiKey,
    };

    const { data } = await firstValueFrom(
      this.httpService.get(apiUrl, {
        params: txListParams,
      }),
    );

    const lastTxTimeStamp = Number(data.result[0]?.timeStamp);

    const lastTxDate = new Date(lastTxTimeStamp);

    return lastTxDate;
  }

  async getAllWallets() {
    return this.repo.find();
  }

  async updateAccountBalance(address: string) {
    const accountBalance = await this.getAddressAmount(address);

    const currentWallet = await this.repo.findOneBy({ address });

    if (accountBalance !== currentWallet.amount) {
      currentWallet.amount = accountBalance;
      await this.repo.save(currentWallet);
    }

    return currentWallet;
  }

  async toggleWalletFavourite(address: string) {
    const currentWallet = await this.repo.findOneBy({ address });

    currentWallet.favourite = !currentWallet.favourite;

    return this.repo.save(currentWallet);
  }
}
