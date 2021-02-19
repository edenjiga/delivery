import { Injectable } from '@nestjs/common';
import { ProductsDataSource } from '@/data';
import { IProduct, ProductToBeSoldBody } from '@/shared';

@Injectable()
export class ProductsService {
  constructor(private productsDataSource: ProductsDataSource) {}

  public findByQuery(params?): Promise<IProduct[]> {
    return this.productsDataSource.getProducts(params);
  }

  public getByIds(ids: Array<string>) {
    const params = ids.reduce((prevValue, id, index) => {
      return { ...prevValue, [`_where[id][${index}]`]: id };
    }, {});

    return this.productsDataSource.getProducts(params);
  }

  public soldProducts(productsToBeSell: ProductToBeSoldBody[]) {
    return this.productsDataSource.soldProducts(productsToBeSell);
  }
}
