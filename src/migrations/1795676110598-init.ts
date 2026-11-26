import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1795676110598 implements MigrationInterface {
    name = 'Init1795676110598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, "content" text NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "updateTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
