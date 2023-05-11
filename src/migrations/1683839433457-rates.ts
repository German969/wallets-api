import { MigrationInterface, QueryRunner } from "typeorm";

export class Rates1683839433457 implements MigrationInterface {
    name = 'Rates1683839433457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_wallet" ("address" varchar PRIMARY KEY NOT NULL, "amount" integer NOT NULL, "favourite" boolean NOT NULL, "firstTransactionDate" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_wallet"("address", "amount", "favourite", "firstTransactionDate") SELECT "address", "amount", "favourite", "firstTransactionDate" FROM "wallet"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`ALTER TABLE "temporary_wallet" RENAME TO "wallet"`);
        await queryRunner.query(`CREATE TABLE "rate" ("currency" varchar PRIMARY KEY NOT NULL, "rate" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_wallet" ("address" varchar PRIMARY KEY NOT NULL, "amount" integer NOT NULL, "favourite" boolean NOT NULL, "firstTransactionDate" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_wallet"("address", "amount", "favourite", "firstTransactionDate") SELECT "address", "amount", "favourite", "firstTransactionDate" FROM "wallet"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`ALTER TABLE "temporary_wallet" RENAME TO "wallet"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" RENAME TO "temporary_wallet"`);
        await queryRunner.query(`CREATE TABLE "wallet" ("address" varchar PRIMARY KEY NOT NULL, "amount" integer NOT NULL, "favourite" boolean NOT NULL, "firstTransactionDate" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "wallet"("address", "amount", "favourite", "firstTransactionDate") SELECT "address", "amount", "favourite", "firstTransactionDate" FROM "temporary_wallet"`);
        await queryRunner.query(`DROP TABLE "temporary_wallet"`);
        await queryRunner.query(`DROP TABLE "rate"`);
        await queryRunner.query(`ALTER TABLE "wallet" RENAME TO "temporary_wallet"`);
        await queryRunner.query(`CREATE TABLE "wallet" ("address" varchar PRIMARY KEY NOT NULL, "amount" integer NOT NULL, "favourite" boolean NOT NULL, "firstTransactionDate" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "wallet"("address", "amount", "favourite", "firstTransactionDate") SELECT "address", "amount", "favourite", "firstTransactionDate" FROM "temporary_wallet"`);
        await queryRunner.query(`DROP TABLE "temporary_wallet"`);
    }

}
