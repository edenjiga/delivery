import { Logger } from '@nestjs/common';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketHandlerEventsUseCases } from 'src/useCases';

@WebSocketGateway()
export class AuthorizationGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  public server: Server;

  constructor(private socketHandleEvent: SocketHandlerEventsUseCases) {}
  handleDisconnect(client: any) {
    this.logger.log('Client disconnect');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client connect');
  }

  @SubscribeMessage('authorization')
  handleEvent(client: Socket, token: string) {
    this.logger.log('authorization is call');
    this.socketHandleEvent.handleAuthizationSocketRequest(client, token);
  }
}
