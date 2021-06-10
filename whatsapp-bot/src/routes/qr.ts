import { Request, Response } from "express";
import { PassThrough } from "stream";
import { getQR } from "../whatsappClient";
import QRCode from "qrcode";

const qr = async (req: Request, res: Response) => {
  const qrStream = new PassThrough();
  const qr = getQR();
  await QRCode.toFileStream(qrStream, qr, {
    type: "png",
    width: 200,
    errorCorrectionLevel: "H",
  });

  qrStream.pipe(res);
};

export default qr;
