import { Injectable } from '@nestjs/common';
import {
  PinpointClient,
  SendMessagesCommand,
  SendMessagesCommandOutput,
} from '@aws-sdk/client-pinpoint';

@Injectable()
export class SmsDataSource {
  private pintPoint: PinpointClient;
  constructor() {
    this.pintPoint = new PinpointClient({
      region: process.env.AWS_REGION,
    });
  }

  public sendSms(
    phone: string,
    code: string,
  ): Promise<SendMessagesCommandOutput> {
    const params = new SendMessagesCommand({
      ApplicationId: process.env.AWS_PINPOINT_ID,
      MessageRequest: {
        Addresses: {
          [`+57${phone}`]: {
            ChannelType: 'SMS',
          },
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: `Tu código de verificación de Kangaroo es: ${code}`,
            MessageType: 'TRANSACTIONAL',
          },
        },
      },
    });

    return this.pintPoint.send(params);
  }
}
