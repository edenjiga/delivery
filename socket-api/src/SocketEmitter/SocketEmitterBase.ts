import { ADMIN_ROOM } from '@/constants';
import { Logger } from '@nestjs/common';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketEmitterBase {
  private logger: Logger = new Logger('SocketEmitter');

  @WebSocketServer()
  public server: Server;

  constructor() {}

  public emitEventToAdmin(event: string, data) {
    this.server.to(ADMIN_ROOM).emit(event, data);
  }

  public emitEventToUser(userId: string, event: string, data: any) {
    this.server.to(userId).emit(event, data);
  }

  public emitEventToUserAndAdmin(userId: string, event: string, data: any) {
    this.server.to(ADMIN_ROOM).emit(event, data);
    this.server.to(userId).emit(event, data);
    this.logger.log(`Event ${event} emit to ${userId} and Admins`);
  }
}
