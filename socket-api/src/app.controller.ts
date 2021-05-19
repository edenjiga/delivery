import { Controller, Get, Req } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  findAll(): string {
    return 'Its working';
  }

  @Get('socket')
  sock() {
    return 'socket is working';
  }
}
