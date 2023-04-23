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

const ADMIN_API_KEY = "d2d66b047e1e465e920e6094b13b064d";
const INVOICE_API_KEY = "6e6ce46efcbb446eaaabcfe55a345d82";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const { amount, memo } = req.body;
    const response = await fetch(
      `https://legend.lnbits.com/satspay/api/v1/charge?api-key=${ADMIN_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": INVOICE_API_KEY,
        },
        body: JSON.stringify({
          onchainwallet: "",
          lnbitswallet: "6649dc21b2f84518b82c83155efa2fe8",
          description: memo,
          webhook: "",
          completelink: "",
          completelinktext: "",
          custom_css: "",
          time: 6000,
          amount: 1, //amount * 100_000_000, //sats conversion
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
      `https://legend.lnbits.com/satspay/api/v1/charge/${paymentID}/?api-key=${ADMIN_API_KEY}`,
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
