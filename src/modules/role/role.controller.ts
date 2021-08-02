import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entity/role.entity';
import { RoleEnum } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleDto } from './dto';
import { RoleService } from './role.service';

@Controller('roles')
@Roles(RoleEnum.ADMIN)
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('roles')
@ApiBearerAuth()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async findAll(): Promise<RoleDto[]> {
    const roles = await this.roleService.findAll();
    return roles.map(RoleDto.from);
  }
}
