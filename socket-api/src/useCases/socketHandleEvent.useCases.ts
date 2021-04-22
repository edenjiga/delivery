import { AuthService } from 'src/services';
import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { USER_ROLES } from '@edenjiga/delivery-common';
import { ADMIN_ROOM } from '@/constants';

@Injectable()
export class SocketHandlerEventsUseCases {
  private logger: Logger = new Logger('SocketEmitter');

  constructor(private authService: AuthService) {}
  public async handleAuthizationSocketRequest(client: Socket, token: string) {
    try {
      if (token) {
        const user = await this.authService.validateTokenAndGetUser(token);
        if (user.roles.includes(USER_ROLES.ADMIN)) {
          client.join(ADMIN_ROOM);

          this.logger.log(`Admin login`);
        }

        client.join(user._id);
      }
    } catch (e) {}
  }
}
