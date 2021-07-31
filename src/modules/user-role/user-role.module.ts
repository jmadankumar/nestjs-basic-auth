import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entity/user-role.entity';
import { UserRoleService } from './user-role.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
