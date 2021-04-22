import { Logger } from '@nestjs/common';

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketHandlerEventsUseCases } from 'src/useCases';

@WebSocketGateway()
export class AuthorizationGateway {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  public server: Server;

  constructor(private socketHandleEvent: SocketHandlerEventsUseCases) {}

  @SubscribeMessage('authorization')
  handleEvent(client: Socket, token: string) {
    this.socketHandleEvent.handleAuthizationSocketRequest(client, token);
  }
}
