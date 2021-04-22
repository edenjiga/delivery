import { writeFileSync } from 'fs';
import { join } from 'path';

const awsFile = Buffer.from(process.env.AWS_CREDENTIALS || 'e30=', 'base64');

writeFileSync(join(process.cwd(), 'credentials'), awsFile.toString());

process.env.AWS_CREDENTIALS = 'credentials';

const environment = {
  hashSalt: process.env.HASH_SALT,
  mongo: {
    url: process.env.MONGO_URL,
  },
  productsAPI: {
    url: process.env.PRODUCT_API_URL,
    token: process.env.PRODUCT_API_TOKEN,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
  },
  nats: {
    url: process.env.NATS_STREAM_URL,
    clientId: process.env.NATS_CLIENT_ID,
    clusterId: process.env.NATS_CLUSTER_ID,
  },
  wompi: {
    url: process.env.WOMPI_URL,
    publicKey: process.env.WOMPI_PUBLIC_KEY,
    privateKey: process.env.WOMPI_PRIVATE_KEY,
    eventsKey: process.env.WOMPI_EVENTS_KEY,
  },
};
export default environment;
