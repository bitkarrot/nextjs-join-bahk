import React, { useState } from 'react';

const LNbitsPayment = ({fee}) => {
  const [invoice, setInvoice] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  const createInvoice = async () => {
    const response = await fetch('/api/lnbits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: fee * 1000000, // Convert BTC to sats
        memo: 'Payment for your service',
      }),
    });
    const data = await response.json();
    setInvoice(data);
  };

  const checkPaymentStatus = async () => {
    if (!invoice) return;

    const response = await fetch(`/api/lnbits?invoiceId=${invoice.id}`);
    const data = await response.json();
    setPaymentStatus(data.paid ? 'Paid' : 'Unpaid');
  };

  return (
    <div>
      <button onClick={createInvoice}>Pay with LNbits</button>
      {/* Optional payment status check */}
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