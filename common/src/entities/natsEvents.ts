import { NATS_SUBJECTS } from "../constants";
import { IOrder } from "./order";
import { Message, Stan } from "node-nats-streaming";

// interface Event {
//   subject: NATS_SUBJECTS;
//   data: any;
// }

abstract class NatsEvent {
  abstract subject: NATS_SUBJECTS;
  abstract data: any;
}

export abstract class Listener<T extends NatsEvent> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
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
