import { ADMIN_ROOM } from '@/constants';
import { SOCKET_EVENTS } from '@edenjiga/delivery-common';
import { Logger } from '@nestjs/common';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketEmitterBase {
  private logger: Logger = new Logger('SocketEmitter');

  @WebSocketServer()
  public server: Server;

  constructor() {}

  public emitEventToAdmin(event: SOCKET_EVENTS, data) {
    this.server.to(ADMIN_ROOM).emit(event, data);
  }

  public emitEventToUser(userId: string, event: SOCKET_EVENTS, data: any) {
    this.server.to(userId).emit(event, data);
  }

  public emitEventToUserAndAdmin(
    userId: string,
    event: SOCKET_EVENTS,
    data: any,
  ) {
    this.server.to(ADMIN_ROOM).emit(event, data);
    this.server.to(userId).emit(event, data);
    this.logger.log(`Event ${event} emit to ${userId} and Admins`);
  }
}
