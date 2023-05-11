import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryColumn()
  currency: string;

  @Column()
  rate: number;
}
