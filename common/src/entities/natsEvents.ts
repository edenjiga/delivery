import { NATS_SUBJECTS } from "../constants";
import { IOrder } from "./order";

// interface Event {
//   subject: NATS_SUBJECTS;
//   data: any;
// }

abstract class NatsEvent {
  abstract subject: NATS_SUBJECTS;
  abstract data: any;
}

export class OrderCreatedNatsEvent extends NatsEvent {
  constructor(data: IOrder) {
    super();
    this.data = data;
  }
  readonly subject = NATS_SUBJECTS.ORDER_CREATED;
  readonly data: IOrder;
}

export class OrderUpdatedNatsEvent extends NatsEvent {
  constructor(data: IOrder) {
    super();
    this.data = data;
  }
  readonly subject = NATS_SUBJECTS.ORDER_UPDATED;
  readonly data: IOrder;
}

export class SettingMobileAppStayUpdatedEvent extends NatsEvent {
  constructor(data: boolean) {
    super();
    this.data = data;
  }
  readonly subject = NATS_SUBJECTS.SETTING_MOBILE_APP_STAY_OPEN;
  readonly data: boolean;
}
