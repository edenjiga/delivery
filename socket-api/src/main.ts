import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomStrategy, MicroserviceOptions } from '@nestjs/microservices';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import environment from './enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 8002;

  //Microservices
  const options: CustomStrategy = {
    strategy: new Listener(
      environment.nats.clusterId /* clusterID */,
      environment.nats.clientId,
      'socker-service' /* queueGroupName */,
      {
        url: environment.nats.url,
      } /* TransportConnectOptions */,
      {
        // durableName: 'user-queue-group',
        manualAckMode: true,
        deliverAllAvailable: true,
      } /* TransportSubscriptionOptions */,
    ),
  };

  app.connectMicroservice<MicroserviceOptions>(options);
  await app.startAllMicroservicesAsync();
  await app.listen(port);

  console.info('App start in port ' + (await app.getUrl()));
}
bootstrap();
