import { WompiUseCases } from '@/useCases/wompi.useCases';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
@Controller('wompi')
export class WompiController {
  constructor(private wompiUseCases: WompiUseCases) {}

  @Post('/events')
  @HttpCode(200)
  public handleWompiEvent(@Body() body) {
    return this.wompiUseCases.handleWompiEvent(body);
  }
}
