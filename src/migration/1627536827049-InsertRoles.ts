import { Role } from 'src/entity/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRoles1627536827049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Role).insert([
      {
        id: 'admin',
        name: 'admin',
      },
      {
        id: 'user',
        name: 'user',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('roles');
  }
}
