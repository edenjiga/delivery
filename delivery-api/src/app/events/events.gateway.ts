// import { ACTIONS, EVENTS } from '@/constants';

import { USER_ROLES } from '@/constants';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private usersOn = 0;
  private ADMIN_ROOM = 'ADMIN_ROOM';
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  public server: Server;

  constructor(private readonly jwtService: JwtService) {}

  @SubscribeMessage('authorization')
  handleEvent(client: Socket, token) {
    try {
      const user = this.jwtService.verify(token);

      if (user.roles.includes(USER_ROLES.ADMIN)) {
        this.logger.log('Admin login');
        client.join(this.ADMIN_ROOM);
      }

      if (user._id) {
        client.join(user._id);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  handleConnection(client: Socket) {
    this.usersOn = this.usersOn + 1;
  }

  handleDisconnect(client: Socket) {
    this.usersOn = this.usersOn - 1;
  }

  public emitEventToAdmin(event: string, data) {
    this.server.to(this.ADMIN_ROOM).emit(event, data);
  }

  public emitEventToUser(userId: string, event: string, data: any) {
    this.server.to(userId).emit(event, data);
  }

  public emitEventToUserAndAdmin(userId: string, event: string, data: any) {
    this.server.to(this.ADMIN_ROOM).emit(event, data);
    this.server.to(userId).emit(event, data);
  }
}
