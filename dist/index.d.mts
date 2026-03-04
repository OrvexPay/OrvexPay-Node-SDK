import { AxiosInstance } from 'axios';

interface CreateInvoiceRequest {
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
interface InvoiceResponse {
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
interface OrvexApiClientOptions {
    /** The API Key generated from your Merchant Dashboard */
    apiKey: string;
    /** Optional custom base URL. Defaults to https://api.orvexpay.com */
    baseURL?: string;
}

declare class InvoicesResource {
    private client;
    constructor(client: AxiosInstance);
    /**
     * Creates a new payment invoice.
     * @param params
     * @returns
     */
    create(params: CreateInvoiceRequest): Promise<InvoiceResponse>;
    /**
     * Retrieves an invoice by its invoiceId.
     * @param id The invoice ID returned by the initial API call
     * @returns
     */
    retrieve(invoiceId: string): Promise<InvoiceResponse>;
}

declare class OrvexClient {
    invoices: InvoicesResource;
    private readonly client;
    constructor(options: OrvexApiClientOptions);
}

export { type CreateInvoiceRequest, type InvoiceResponse, InvoicesResource, type OrvexApiClientOptions, OrvexClient };
