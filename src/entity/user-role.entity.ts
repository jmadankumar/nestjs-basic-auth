import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_role')
export class UserRole {
  @PrimaryColumn({ name: 'user_id', nullable: false })
  userId: string;

  @PrimaryColumn({ name: 'role_id', nullable: false })
  roleId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;
}
