import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth';
import { OrdersUseCases } from '@/useCases';
import { UpdateOrderDto } from '@/shared';
import { CreateOrderDto } from '@edenjiga/delivery-common';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersUseCases: OrdersUseCases) {}

  @Get()
  getOrders(@Req() req) {
    const { user, query } = req;
    return this.ordersUseCases.getOrders(user, query);
  }

  @Get('/:orderId')
  getOrderById(@Req() req, @Param('orderId') orderId: string) {
    const { user } = req;

    return this.ordersUseCases.getOrderById(user._id, orderId);
  }

  @Post('/')
  createOrder(@Req() req, @Body() body: CreateOrderDto) {
    const { user } = req;
    return this.ordersUseCases.createOrder(user, body);
  }

  @Patch('/:orderId')
  updateOrder(
    @Req() req,
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderDto,
  ) {
    const { user } = req;

    return this.ordersUseCases.updateOrder(user, orderId, body);
  }
}
