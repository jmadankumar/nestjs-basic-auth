import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRoleTable1627531465354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'varchar(50)',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(50)',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
