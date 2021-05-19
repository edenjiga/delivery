import { USER_ROLES } from '@/constants';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class JwtAdminAuthGuard extends JwtAuthGuard {
  handleRequest(err, user, info, context, status) {
    if (!user || err) {
      return super.handleRequest(err, user, info, context, status);
    }

    const isAdmin = user.roles?.some((role) => role === USER_ROLES.ADMIN);
    // // You can throw an exception based on either "info" or "err" arguments
    if (!isAdmin) {
      throw err || new ForbiddenException();
    }

    return user;
  }
}
