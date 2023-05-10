import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryColumn()
  address: string;

  @Column()
  amount: number;

  @Column()
  favourite: boolean;

  @Column()
  firstTransactionDate: Date;
}
