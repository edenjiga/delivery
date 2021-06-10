import "dotenv/config";
import app from "./app";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const PORT = process.env.port || 1000;

const start = async () => {
  if (!process.env.PRODUCT_API_URL) {
    throw new Error("PRODUCT_API_URL is required");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_STREAM_URL) {
    throw new Error("NATS_STREAM_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_STREAM_URL
  );

  natsWrapper.client.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new OrderCreatedListener(natsWrapper.client).listen();

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());

  app.listen(PORT, () => console.info(`Whatsapp bot lister by port ${PORT}`));
};

start();
