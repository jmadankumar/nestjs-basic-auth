import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserRoleTable1627668255658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_role',
        columns: [
          {
            name: 'user_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'role_id',
            type: 'varchar(50)',
            isPrimary: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'user_role',
      new TableForeignKey({
        name: 'fk_user_role_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'user_role',
      new TableForeignKey({
        name: 'fk_user_role_role_id',
        columnNames: ['role_id'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_role', 'fk_user_role_user_id');
    await queryRunner.dropForeignKey('user_role', 'fk_user_role_role_id');
    await queryRunner.dropTable('user_role');
  }
}
