export class GetSettingsResponse {
  isStoreOpen: boolean;
  nativeAppVersion: string;
  deliveryValue: {
    simpleDeliveryValue: number;
    doubleDeliveryValue: number;
  };
}
