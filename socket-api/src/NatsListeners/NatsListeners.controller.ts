import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import {
  NATS_SUBJECTS,
  OrderCreatedNatsEvent,
  OrderUpdatedNatsEvent,
  SOCKET_EVENTS,
} from '@edenjiga/delivery-common';
import { SocketEmitterBase } from '@/SocketEmitter';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
@Controller()
export class NatsListenerController {
  constructor(private socketEmitter: SocketEmitterBase) {}

  @EventPattern<OrderCreatedNatsEvent['subject']>(NATS_SUBJECTS.ORDER_CREATED)
  public async orderCreated(
    @Payload() data: OrderCreatedNatsEvent['data'],
    @Ctx() context: NatsStreamingContext,
  ) {
    this.socketEmitter.emitEventToUserAndAdmin(
      data.userId,
      SOCKET_EVENTS.ORDER_UPDATED,
      data,
    );
    context.message.ack();
  }

  @EventPattern<OrderUpdatedNatsEvent['subject']>(NATS_SUBJECTS.ORDER_UPDATED)
  public async orderUpdated(
    @Payload() data: OrderUpdatedNatsEvent['data'],
    @Ctx() context: NatsStreamingContext,
  ) {
    this.socketEmitter.emitEventToUserAndAdmin(
      data.userId,
      SOCKET_EVENTS.ORDER_UPDATED,
      data,
    );
    context.message.ack();
  }
}
