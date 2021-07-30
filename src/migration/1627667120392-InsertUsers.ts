import { AuthProvider } from 'src/enums/auth-provider.enum';
import { Gender } from 'src/enums/gender.enum';
import { UserEntity } from 'src/shared/modules/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUsers1627667120392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(UserEntity).insert([
      {
        firstName: 'admin',
        gender: Gender.MALE,
        email: 'admin@example.com',
        password: '',
        authProvider: AuthProvider.LOCAL,
        active: true,
        deleted: false,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('users');
  }
}
