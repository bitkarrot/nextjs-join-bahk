const apiKey = '';
const walletId = ''; //5fv2Vt5WEuLYBzkhFiaDN4r6xy6JdNqTbi3m1mG4ngFa

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, memo } = req.body;

    const response = await fetch(`https://lnbits.com/api/v1/wallets/${walletId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        out: true,
        amount,
        memo,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else if (req.method === 'GET') {
    const { invoiceId } = req.query;

    const response = await fetch(`https://lnbits.com/api/v1/wallets/${walletId}/invoices/${invoiceId}`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}