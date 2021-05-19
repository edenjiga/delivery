
import { MobileErrorsUseCases } from '@/useCases';
import { MobileErrorDto } from '@edenjiga/delivery-common';import { Body, Controller, HttpCode, Post, Logger } from '@nestjs/common';

@Controller('errors')
export class ErrorController {
  protected logger: Logger;
  constructor(
    private mobileErrorsUseCases: MobileErrorsUseCases,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  @Post()
  @HttpCode(201)
  public create(
    @Body() body: MobileErrorDto,
  ): Promise<object> {
    this.logger.error('Error in app: ', JSON.stringify(body));
    return this.mobileErrorsUseCases.createError(body);
  }
}
