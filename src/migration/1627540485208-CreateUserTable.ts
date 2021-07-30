import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1627540485208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'first_name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'gender',
            type: "ENUM('male','female','others')",
            isNullable: true,
          },
          {
            name: 'dob',
            type: 'TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'image_url',
            type: 'varchar(1000)',
            isNullable: true,
          },
          {
            name: 'mobile',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'auth_provider',
            type: "ENUM('local','google')",
            isNullable: false,
            default: "'local'",
          },
          {
            name: 'active',
            type: 'TINYINT',
            isNullable: false,
            default: false,
          },
          {
            name: 'otp',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'otp_expiry_date',
            type: 'TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'activation_token',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'activation_token_expiry_date',
            type: 'TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'reset_token',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'reset_token_expiry_date',
            type: 'TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'created_date',
            type: 'TIMESTAMP',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'created_by',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'updated_date',
            type: 'TIMESTAMP',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_by',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'deleted',
            type: 'TINYINT',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
