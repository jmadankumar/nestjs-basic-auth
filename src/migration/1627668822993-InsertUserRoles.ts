import { UserRole } from 'src/entity/user-role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUserRoles1627668822993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(UserRole).insert([
      {
        userId: 'c062d85b-1207-4be6-9c33-1386d192553b',
        roleId: 'admin',
      },
      {
        userId: 'c062d85b-1207-4be6-9c33-1386d192553b',
        roleId: 'user',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('user_role');
  }
}
