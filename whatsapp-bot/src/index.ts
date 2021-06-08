import "dotenv/config";
import app from "./app";

const PORT = process.env.port || 1000;

if (!process.env.PRODUCT_API_URL) {
  throw new Error("PRODUCT_API_URL is required");
}
app.listen(PORT, () => console.info(`Whatsapp bot lister by port ${PORT}`));
