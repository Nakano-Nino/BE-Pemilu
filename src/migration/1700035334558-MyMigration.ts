import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1700035334558 implements MigrationInterface {
    name = 'MyMigration1700035334558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "orderNum" integer NOT NULL, "VissionMission" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artikel" ("id" SERIAL NOT NULL, "articleName" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bba1367c30e25eaba3e75f92b36" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artikel"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
    }

}
