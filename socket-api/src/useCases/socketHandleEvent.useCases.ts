import { AuthService } from 'src/services';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { USER_ROLES } from '@edenjiga/delivery-common';
import { ADMIN_ROOM } from '@/constants';

@Injectable()
export class SocketHandlerEventsUseCases {
  constructor(private authService: AuthService) {}
  public async handleAuthizationSocketRequest(client: Socket, token: string) {
    try {
      if (token) {
        const user = await this.authService.validateTokenAndGetUser(token);
        if (user.roles.includes(USER_ROLES.ADMIN)) {
          client.join(ADMIN_ROOM);
          return;
        }

        client.join(user._id);
      }
    } catch (e) {}
  }
}
