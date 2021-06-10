import { getStatus } from "../whatsappClient";
import { Response, Request } from "express";

const status = async (req: Request, res: Response) => {
  const status = await getStatus();
  res.send(status);
};

export default status;
