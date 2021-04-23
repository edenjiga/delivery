import { Logger } from '@nestjs/common';

import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketHandlerEventsUseCases } from 'src/useCases';

@WebSocketGateway()
export class AuthorizationGateway implements OnGatewayConnection {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  public server: Server;

  constructor(private socketHandleEvent: SocketHandlerEventsUseCases) {}
  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client connect');
  }

  @SubscribeMessage('authorization')
  handleEvent(client: Socket, token: string) {
    this.socketHandleEvent.handleAuthizationSocketRequest(client, token);
  }
}
