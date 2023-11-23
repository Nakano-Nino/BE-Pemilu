import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1700673852944 implements MigrationInterface {
    name = 'MyMigration1700673852944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voter" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "voter" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "voter" ADD "paslon" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artikel" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "partai" ADD "paslonId" integer`);
        await queryRunner.query(`ALTER TABLE "artikel" ADD CONSTRAINT "FK_54140fdb53c491b77c5536a967d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partai" ADD CONSTRAINT "FK_6e81e0a136eec2e38810173f217" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partai" DROP CONSTRAINT "FK_6e81e0a136eec2e38810173f217"`);
        await queryRunner.query(`ALTER TABLE "artikel" DROP CONSTRAINT "FK_54140fdb53c491b77c5536a967d"`);
        await queryRunner.query(`ALTER TABLE "partai" DROP COLUMN "paslonId"`);
        await queryRunner.query(`ALTER TABLE "artikel" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "voter" DROP COLUMN "paslon"`);
        await queryRunner.query(`ALTER TABLE "voter" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "voter" ADD "username" character varying NOT NULL`);
    }

}
