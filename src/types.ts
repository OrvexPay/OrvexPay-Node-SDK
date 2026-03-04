export interface CreateInvoiceRequest {
    /** The amount the merchant wants to receive, e.g. "100.00" */
    priceAmount: string | number;
    /** The fiat currency of the price, e.g. "TRY", "USD", "EUR" */
    priceCurrency: string;
    /** The cryptocurrency the user will pay in, e.g. "USDT", "BTC" */
    payCurrency: string;
    /** Customer's return URL after successful payment */
    successUrl: string;
    /** Customer's return URL after choosing to cancel */
    cancelUrl: string;
    /** Merchant's internal reference ID for this order */
    orderId: string;
    /** Optional description for the order to display on the checkout page */
    orderDescription?: string;
    /** Whether the merchant or customer pays the network fee (Merchant or Customer) */
    feePayer?: 'Merchant' | 'Customer';
}

export interface InvoiceResponse {
    id: string;
    invoiceId: string;
    orderId: string;
    priceAmount: number;
    priceCurrency: string;
    payAmount: number;
    payCurrency: string;
    priceAmountInUsd?: number;
    amountReceived?: number;
    payAddress: string;
    status: string;
    createdAt: string;
    expiresAt: string;
    payUrl: string;
}

export interface OrvexApiClientOptions {
    /** The API Key generated from your Merchant Dashboard */
    apiKey: string;
    /** Optional custom base URL. Defaults to https://api.orvexpay.com */
    baseURL?: string;
}
