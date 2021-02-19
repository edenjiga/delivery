import { Injectable, HttpService } from '@nestjs/common';
import environment from '@/environment';
import { IProduct, ProductToBeSoldBody } from '@/shared';

@Injectable()
export class ProductsDataSource {
  private API_URL = environment.productsAPI.url;
  private API_TOKEN = environment.productsAPI.token;
  constructor(private httpService: HttpService) {}

  /**
   * getProducts
   */
  public async getProducts(params = {}): Promise<IProduct[]> {
    const { data } = await this.httpService
      .get<IProduct[]>(`${this.API_URL}/products`, { params })
      .toPromise();

    return data;
  }

  public async soldProducts(body: ProductToBeSoldBody[]) {
    const params = {
      token: this.API_TOKEN,
    };
    const { data } = await this.httpService
      .put(`${this.API_URL}/products/sold`, body, {
        params,
      })
      .toPromise();

    return data;
  }
}
