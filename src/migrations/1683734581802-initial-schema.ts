import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1683734581802 implements MigrationInterface {
    name = 'InitialSchema1683734581802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("address" varchar PRIMARY KEY NOT NULL, "amount" integer NOT NULL, "favourite" boolean NOT NULL, "firstTransactionDate" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
