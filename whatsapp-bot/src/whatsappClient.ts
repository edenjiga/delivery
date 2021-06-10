import axios from "axios";
import { Product } from "@edenjiga/delivery-common";
import fs from "fs";
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

let qr = "";

// Path where the session data will be stored
const SESSION_FILE_PATH = __dirname + "/session.json";

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
  session: sessionData,
  restartOnAuthFail: true,
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// Save session values to the file upon successful auth
client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err: any) {
    console.log(err);
    if (err) {
      console.error(err);
    }
  });
});

client.on("auth_failure", () => {
  console.log("auth_failure");
  fs.unlinkSync(SESSION_FILE_PATH);
  sessionData = undefined;
});

client.on("qr", (clientQr) => {
  qr = clientQr;
  qrcode.generate(qr, { small: true });
});

client.on("disconnected", () => {
  console.log("disconnected");
  client.initialize();
});
client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async function (message) {
  const privateMessage = await message.getChat();

  const messages = await privateMessage.fetchMessages({ limit: 10 });

  console.log("Mensaje recibido", message.body);

  if (
    messages.length === 1 ||
    //check if have been pass more that 1 hour between two messages
    messages[messages.length - 1].timestamp -
      messages[messages.length - 2].timestamp >
      3600
  ) {
    client.sendMessage(
      message.from,
      "Hola, Gracias por comunicarte con *Kangaroo*.\nMarca *1* si deseas la lista de precios.\nMarca *2* si deseas comunicarte con un asesor."
    );
  }

  if (messages.length > 2 && message.body === "1") {
    const { data }: { data: Product[] } = await axios.get(
      `${process.env.PRODUCT_API_URL}/products`
    );

    const productWithPrices = data
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((product) => `${product.name} - $ *${product.price}*\n`)
      .reduce((prevValue, currentValue) => prevValue + currentValue, "");

    client.sendMessage(
      message.from,
      `*LISTA DE PRODUCTOS* \n${productWithPrices}`
    );
  }
});

client.initialize();

const getQR = () => qr;
const getStatus = () => client.getState();

export { getQR, getStatus, client };
