import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCreatedNatsEvent,
  NATS_SUBJECTS,
} from "@edenjiga/delivery-common";
import { queueGroupName } from "./queue-group-name";
import { client } from "../../whatsappClient";

export class OrderCreatedListener extends Listener<OrderCreatedNatsEvent> {
  subject: NATS_SUBJECTS.ORDER_CREATED = NATS_SUBJECTS.ORDER_CREATED;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedNatsEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    try {
      await client.sendMessage(
        process.env.CHAT_REPORT_ID,
        `Se Ha creado una orden por valor de $${data.price}`
      );
    } catch (err) {
      console.log("no se pudo enviar mensaje al grupo");
    }
    // ack the message
    msg.ack();
  }
}
