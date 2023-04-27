import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST"], // Allow only GET and POST requests
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const ADMIN_API_KEY = process.env.ADMIN_API_KEY
const INVOICE_API_KEY = process.env.INVOICE_API_KEY
const ON_CHAIN_WALLET = process.env.ON_CHAIN_WALLET;
const LNBITS_WALLET = process.env.LNBITS_WALLET;
const LNBITS_BASE_URL = process.env.LNBITS_BASE_URL;

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const { amount, memo } = req.body;
    const response = await fetch(
      `${LNBITS_BASE_URL}/satspay/api/v1/charge?api-key=${ADMIN_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": INVOICE_API_KEY,
        },
        body: JSON.stringify({
          onchainwallet: ON_CHAIN_WALLET,
          lnbitswallet: LNBITS_WALLET,
          description: memo,
          webhook: "",
          completelink: `${LNBITS_BASE_URL}/satspay/`,
          completelinktext: "",
          custom_css: "",
          time: 6000, // use payment_countdown in lib/constants.js
          amount: 5, //amount * 100000000, //sats conversion
          extra:
            '{"mempool_endpoint": "https://mempool.space", "network": "Mainnet"}',
        }),
      }
    );
    const data = await response.json();

    res.status(200).json(data);
  } else if (req.method === "GET") {
    const { paymentID } = req.query;
    const response = await fetch(
      `${LNBITS_BASE_URL}/satspay/api/v1/charge/${paymentID}/?api-key=${ADMIN_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": INVOICE_API_KEY,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
