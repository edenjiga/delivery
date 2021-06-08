import "dotenv/config";
import QRCode from "qrcode";
import cors from "cors";
import { PassThrough } from "stream";
import { getQR, getStatus } from "./whatsappClient";

import express from "express";

const app = express();

app.use(cors({}));

app.get("/whatsapp/qr", async (req, res, next) => {
  try {
    const qrStream = new PassThrough();
    const qr = getQR();
    await QRCode.toFileStream(qrStream, qr, {
      type: "png",
      width: 200,
      errorCorrectionLevel: "H",
    });

    qrStream.pipe(res);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
app.get("/whatsapp/status", async (req, res, next) => {
  try {
    const status = await getStatus();
    res.send(status);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.use((error: any, req: Express.Request, res: any, next: any) => {
  return res.status(500).send({ error: error.message });
});
export default app;
