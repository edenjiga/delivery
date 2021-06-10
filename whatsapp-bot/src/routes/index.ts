import { Router } from "express";
const router = Router();

import qr from "./qr";
import status from "./status";

router.get("/whatsapp/qr", qr);
router.get("/whatsapp/status", status);
export default router;
