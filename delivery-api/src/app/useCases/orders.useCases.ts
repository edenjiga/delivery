import { IOrderDoc, IUserDoc } from '@/models';
import * as _ from 'lodash';
import {
  OrdersService,
  ProductsService,
  SettingsService,
  UsersService,
  WompiService,
} from '@/services';
import {
  BadPriceError,
  InvalidPaymentError,
  OrderNotFoundError,
  OrderNotCancellableError,
  ProductOutStockError,
  UpdateOrderDto,
  OrderBadStatusUpdateError,
  StoreCloseError,
} from '@/shared';
import {
  PaymentError,
  PaymentNotCompletedError,
} from '@/shared/errors/payments.error';
import { UserIncompleteError } from '@/shared/errors/user.error';
import { isUserAdmin } from '@/shared/utils';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateOrderDto,
  IOrder,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  Product,
} from '@edenjiga/delivery-common';

interface IProductWithUnits {
  product: Product;
  unitsPurchased: number;
}

@Injectable()
export class OrdersUseCases {
  constructor(
    private productsServices: ProductsService,
    private usersService: UsersService,
    private orderService: OrdersService,
    private settingsService: SettingsService,
    private wompiService: WompiService,
  ) {}

  private calulateDelivery(products: Array<Product>): number {
    const {
      simpleDeliveryValue,
      doubleDeliveryValue,
    } = this.settingsService.getDeliveryValue();

    //Check if the some product is need to be pick up after
    return products.some(({ isReturnable }) => isReturnable)
      ? doubleDeliveryValue
      : simpleDeliveryValue;
  }

  async getOrders(user, params) {
    const optionsFields = [
      'select',
      'collation',
      'populate',
      'sort',
      'offset',
      'page',
      'limit',
    ];

    const query = _.omit(params, optionsFields);
    const options = _.pick(params, optionsFields);

    if (isUserAdmin(user)) {
      return this.orderService.paginate(query, options);
    }

    return this.orderService.paginate({ ...query, userId: user._id }, options);
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderService.findById(orderId);

    if (order.userId.toString() !== userId) {
      throw new ForbiddenException();
    }

    return order;
  }

  public async createOrder(user: IUserDoc, data: CreateOrderDto) {
    const isStoreOpen = await this.settingsService.isStoreOpen();

    if (!isStoreOpen) {
      throw new StoreCloseError();
    }

    const { products: dataProducts, price, payment, address } = data;
    if (!user.identification || !user.email || !user.name) {
      throw new UserIncompleteError();
    }

    //get the products id

    const productsIds = dataProducts.map(({ id }) => id);

    const products = await this.productsServices.getByIds(productsIds);
    //verify the product unit available
    if (!products) {
      throw new ProductOutStockError();
    }

    const productsWithUnit = this.verifyProductInStock(dataProducts, products);

    const {
      totalDiscount,
      totalWithDiscount,
    } = this.calculateTotalAndTotalDiscountAndTotalWithDiscount(
      productsWithUnit,
    );

    const deliveryValue = this.calulateDelivery(products);

    if (price !== totalWithDiscount + deliveryValue) {
      throw new BadPriceError();
    }

    let creditCard;

    if (payment.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
      creditCard = await this.usersService.findOrAddCreditCardByUserId(
        user._id,
        payment.creditCard,
      );

      if (!creditCard) throw new InvalidPaymentError();
    }

    // Verify Address

    const orderData: Omit<IOrder, '_id'> = {
      discountValue: totalDiscount,
      deliveryValue,
      payment: {
        paymentMethod: data.payment.paymentMethod,
        status: PAYMENT_STATUS.NOT_PAID,
        creditCard,
      },
      price,
      productsWithUnit,
      userId: user._id,
      status: ORDER_STATUS.CREATED,
      address,
    };

    const order = await this.orderService.createOrder(orderData);

    return order;
  }

  async updateOrder(user: IUserDoc, orderId: string, body: UpdateOrderDto) {
    const { status } = body;
    let newOrderData = {};

    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new OrderNotFoundError();
    }

    switch (status) {
      case ORDER_STATUS.CANCELED:
        newOrderData = this.cancelOrder(user, order);
        break;
      case ORDER_STATUS.COMPLETED:
        newOrderData = await this.verifyPutOrderInCompleted(user, order);
        break;
      default:
        newOrderData = await this.verifyPutOrderInProcess(user, order);
    }

    return this.orderService.updateOrderById(orderId, newOrderData);
  }

  private calculateTotalAndTotalDiscountAndTotalWithDiscount(
    products: IProductWithUnits[],
  ) {
    let total = 0;
    let totalWithDiscount = 0;
    let totalDiscount = 0;
    products.forEach(({ product, unitsPurchased }) => {
      total = total + product.price * unitsPurchased;
      totalWithDiscount =
        totalWithDiscount + product.finalPrice * unitsPurchased;
      totalDiscount = totalDiscount + product.discountValue * unitsPurchased;
    });

    return { total, totalWithDiscount, totalDiscount };
  }

  private verifyProductInStock(
    dataProducts: { id: string; unitsPurchased: number }[],
    products: Product[],
  ): IProductWithUnits[] {
    const productsWithQuantity: IProductWithUnits[] = [];
    for (let index = 0; index < dataProducts.length; index++) {
      const element = dataProducts[index];
      const product = products.find(({ _id }) => element.id === _id);

      if (!product || product.unitsInStock < element.unitsPurchased) {
        throw new ProductOutStockError();
      }

      productsWithQuantity.push({
        product,
        unitsPurchased: element.unitsPurchased,
      });
    }

    return productsWithQuantity;
  }

  private cancelOrder = (user: IUserDoc, order: IOrderDoc) => {
    const isAdmin = isUserAdmin(user);
    if (!isAdmin && user._id !== order.userId.toString()) {
      throw new UnauthorizedException();
    }

    if (!isAdmin && order.status !== ORDER_STATUS.CREATED) {
      throw new OrderNotCancellableError();
    }

    return {
      status: ORDER_STATUS.CANCELED,
    };
  };

  private async verifyPutOrderInProcess(user: IUserDoc, order: IOrderDoc) {
    let paymentStatus = order.payment.status;

    if (!isUserAdmin(user)) {
      throw new UnauthorizedException();
    }

    if (order.status !== ORDER_STATUS.CREATED) {
      throw new OrderBadStatusUpdateError();
    }

    if (order.payment.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
      const { status } = await this.wompiService.submitPay(order, user.email);
      if (status !== PAYMENT_STATUS.PENDING) {
        throw new PaymentError();
      }
      paymentStatus = PAYMENT_STATUS.PENDING;
    }

    return {
      payment: { ...order.payment, status: paymentStatus },
      status: ORDER_STATUS.IN_PROGRESS,
    };
  }

  private async verifyPutOrderInCompleted(user: IUserDoc, order: IOrderDoc) {
    if (!isUserAdmin(user)) {
      throw new UnauthorizedException();
    }

    if (order.status !== ORDER_STATUS.IN_PROGRESS) {
      throw new OrderBadStatusUpdateError();
    }

    if (
      order.payment.paymentMethod === PAYMENT_METHODS.CREDIT_CARD &&
      order.payment.status !== PAYMENT_STATUS.APPROVED
    ) {
      throw new PaymentNotCompletedError();
    }

    const productsToBeSold = order.productsWithUnit.map(
      ({ product, unitsPurchased }) => ({
        id: product._id,
        soldUnits: unitsPurchased,
      }),
    );

    await this.productsServices.soldProducts(productsToBeSold);

    return {
      status: ORDER_STATUS.COMPLETED,
      payment: { ...order.payment, status: PAYMENT_STATUS.APPROVED },
    };
  }
}
