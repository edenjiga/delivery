import { Injectable, HttpService } from '@nestjs/common';
import environment from '@/environment';
import { ProductToBeSoldBody } from '@/shared';
import { Product } from '@edenjiga/delivery-common';

@Injectable()
export class ProductsDataSource {
  private API_URL = environment.productsAPI.url;
  private API_TOKEN = environment.productsAPI.token;
  constructor(private httpService: HttpService) {}

  /**
   * getProducts
   */
  public async getProducts(params = {}): Promise<Product[]> {
    const { data } = await this.httpService
      .get<Product[]>(`${this.API_URL}/products`, { params })
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
