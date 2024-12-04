import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ResponseMessage, SkipCheckPermission, User } from '../decorator/customize';
import { IUser } from 'src/users/users.interface';
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage("Create a new subscriber")
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser
  ) {
    return this.subscribersService.create(createSubscriberDto,user);
  }

  @Get()
  @ResponseMessage("Fetch all subscriber with paginate")
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string
  ) {
    return this.subscribersService.findAll(+currentPage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch subscriber")
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Post()
  @ResponseMessage('Get subscribers by skill')
  @SkipCheckPermission()
  getUserSkill(@User() user:IUser ) {
      return this.subscribersService.getSkills(user)
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage("Update subscriber")
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user:IUser
  ) {
    return this.subscribersService.update(id, updateSubscriberDto,user);
  }

  @Delete(':id')
  @ResponseMessage("Remove subscriber")
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
      return this.subscribersService.remove(id,user);
  }
}
