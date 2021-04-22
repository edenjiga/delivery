import { Injectable, HttpService } from '@nestjs/common';
import environment from 'src/enviroment';
import { UserPublicFields } from '@edenjiga/delivery-common';

@Injectable()
export class AuthService {
  private API_URL = environment.deliveryApi.url;

  constructor(private httpService: HttpService) {}

  public async validateTokenAndGetUser(token: string) {
    const { data } = await this.httpService
      .get<UserPublicFields>(`${this.API_URL}/users/me`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .toPromise();

    return data;
  }
}
