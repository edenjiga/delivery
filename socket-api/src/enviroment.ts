const environment = {
  deliveryApi: {
    url: process.env.DELIVERY_API,
  },
  nats: {
    url: process.env.NATS_STREAM_URL,
    clientId: process.env.NATS_CLIENT_ID,
    clusterId: process.env.NATS_CLUSTER_ID,
  },
};

export default environment;
