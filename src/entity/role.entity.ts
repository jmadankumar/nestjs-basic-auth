import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryColumn({ name: 'id', unique: true, nullable: false })
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;
}
