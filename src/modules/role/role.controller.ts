import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleReqDto, CreateRoleResDto, AssignRoleReqDto } from './dto';
import { Roles } from '../../decorators/role.decorator';
import { RolesGuard } from '../../guards/role.guard';
import { EAction, EResource, Role } from '../../types/role';
import { User } from '../../types/user';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('')
  @ApiOperation({ summary:'Create New role - this endpoint requires (Manage) action on (Role) resource' })
  @ApiBearerAuth()
  @Roles([EAction.MANAGE, EAction.CREATE], EResource.ROLE)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createRole(@Body() createRoleReqDto: CreateRoleReqDto): Promise<CreateRoleResDto> {
    const role = await this.roleService.createRole(createRoleReqDto);
    return { message: 'Role created successfully', data: role };
  }

  @Get('')
  @ApiOperation({ summary:'Get All Roles - this endpoint requires (Manage or Read) actions on (Role) resource'})
  @ApiBearerAuth()
  @Roles([EAction.MANAGE, EAction.READ], EResource.ROLE)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Post('assign')
  @ApiOperation({ summary: "Assign Role to user - this endpoint doesn't require any roles to use it" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  assignRole(@Body() { userId, roleId }: AssignRoleReqDto): Promise<User> {
    return this.roleService.assignRoleToUser(userId, roleId);
  }
}
