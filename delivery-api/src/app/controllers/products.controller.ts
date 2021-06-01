import { Controller, Get, Query } from '@nestjs/common';
import { ProductsUseCases } from '@/useCases';

@Controller('products')
export class ProductsController {
  constructor(private productsUseCases: ProductsUseCases) {}

  @Get('/')
  public getProducts(@Query() query) {
    return this.productsUseCases.getProducts(query);
  }
}
