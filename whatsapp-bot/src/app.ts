import "dotenv/config";
import QRCode from "qrcode";

import { PassThrough } from "stream";
import { getQR, getStatus } from "./whatsappClient";

import express from "express";

const app = express();

app.get("/qr", async (req, res) => {
  const qrStream = new PassThrough();
  const qr = getQR();
  const result = await QRCode.toFileStream(qrStream, qr, {
    type: "png",
    width: 200,
    errorCorrectionLevel: "H",
  });

  qrStream.pipe(res);
});
app.get("/status", async (req, res) => {
  const status = await getStatus();

  res.send(status);
});
export default app;
