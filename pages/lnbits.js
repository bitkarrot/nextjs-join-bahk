import React, { useState } from 'react';

const LNbitsPayment = ({fee}) => {
  const [invoice, setInvoice] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  const createInvoice = async () => {
    const apiKey = 'your_lnbits_api_key';
    const walletId = 'your_lnbits_wallet_id';
    // const fee = 0.0001;

    const response = await fetch(`https://lnbits.com/api/v1/wallets/${walletId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        out: true,
        amount: fee * 1000000, // Convert BTC to sats
        memo: 'Payment for your service',
      }),
    });

    const data = await response.json();
    setInvoice(data);
  };

  const checkPaymentStatus = async () => {
    if (!invoice) return;

    const apiKey = 'your_lnbits_api_key';
    const walletId = 'your_lnbits_wallet_id';

    const response = await fetch(`https://lnbits.com/api/v1/wallets/${walletId}/invoices/${invoice.id}`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    const data = await response.json();
    setPaymentStatus(data.paid ? 'Paid' : 'Unpaid');
  };

  return (
    <div>
      <button onClick={createInvoice}>Pay with LNbits</button>
      {invoice && (
        <div>
          <p>Invoice: {invoice.payment_request}</p>
          <p>Status: {paymentStatus}</p>
          <button onClick={checkPaymentStatus}>Check Payment Status</button>
        </div>
      )}
    </div>
  );
};

export default LNbitsPayment;