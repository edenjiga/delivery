import { Injectable } from '@nestjs/common';
import { ProductsService } from '@/services';

@Injectable()
export class ProductsUseCases {
  constructor(private productsService: ProductsService) {}

  public async getProducts(params?) {
    return this.productsService.findByQuery(params);
  }
}
