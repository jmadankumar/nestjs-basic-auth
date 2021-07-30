import { AuthProvider } from 'src/enums/auth-provider.enum';
import { Gender } from 'src/enums/gender.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'dob' })
  dob: Date;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'mobile' })
  mobile: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({
    name: 'auth_provider',
    type: 'enum',
    nullable: false,
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  authProvider: AuthProvider;

  @Column({ name: 'active', nullable: false, default: false })
  active: boolean;

  @Column({ name: 'otp' })
  otp: string;

  @Column({ name: 'otp_expiry_date' })
  otpExpiryDate: Date;

  @Column({ name: 'activation_token' })
  activationToken: string;

  @Column({ name: 'activation_token_expiry_date' })
  activationTokenExpiryDate: Date;

  @Column({ name: 'reset_token' })
  resetToken: string;

  @Column({ name: 'reset_token_expiry_date' })
  resetTokenExpiryDate: Date;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'deleted', default: false })
  deleted: boolean;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles: UserRoleEntity[];
}
