# OrvexPay Node.js SDK

The official Node.js SDK for integrating with the OrvexPay API. Fast, type-safe, and easy to use.

## Installation

```bash
npm install orvex-pay
```

## Getting Started

Initialize the client with your API Key (from the Merchant Dashboard).

```typescript
import { OrvexClient } from 'orvex-pay';

const orvex = new OrvexClient({
  apiKey: 'your_api_key_here.xxxxxxxxxxxxxxxxxxxxxxxx',
});

// Create a new invoice payment link
async function main() {
  try {
    const invoice = await orvex.invoices.create({
      priceAmount: 50.00,
      priceCurrency: "USD",
      payCurrency: "USDT",
      orderId: "ORDER-12345",
      successUrl: "https://yourwebsite.com/success",
      cancelUrl: "https://yourwebsite.com/cancel",
      orderDescription: "Premium Subscription"
    });

    console.log("Payment URL:", invoice.payUrl);
  } catch (error) {
    console.error("Error creating invoice:", error);
  }
}

main();
```

## Resources

Currently, this SDK supports the `invoices` resource.

### `orvex.invoices.create(params)`
Creates a new payment invoice and returns an `InvoiceResponse` containing the `payUrl`.

### `orvex.invoices.retrieve(invoiceId)`
Gets the status of an existing invoice using its `invoiceId`.

## Webhook Security

To ensure that a webhook was actually sent by OrvexPay, you should verify the signature.

```typescript
import { OrvexClient } from 'orvex-pay';

// Use the raw body of the request
const isValid = OrvexClient.webhooks.verifySignature(
  req.rawBody, 
  req.headers['x-orvex-signature'], 
  process.env.ORVEX_WEBHOOK_SECRET
);

if (isValid) {
  // Process the payment event
}
```

---

*For full API documentation, visit the [OrvexPay Developer Portal](https://orvexpay.com/developers/docs).*
