import { AuthProvider } from 'src/enums/auth-provider.enum';
import { Gender } from 'src/enums/gender.enum';
import { User } from 'src/entity/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUsers1627667120392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).insert([
      {
        id: 'c062d85b-1207-4be6-9c33-1386d192553b',
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
