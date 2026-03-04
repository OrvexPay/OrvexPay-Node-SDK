import axios, { AxiosInstance } from 'axios';
import { OrvexApiClientOptions } from './types';
import { InvoicesResource } from './resources/invoices';
import { Webhooks } from './webhooks';
import { OrvexError } from './errors';

export class OrvexClient {
    public invoices: InvoicesResource;
    public webhooks = Webhooks;
    private readonly client: AxiosInstance;

    constructor(options: OrvexApiClientOptions) {
        if (!options.apiKey) {
            throw new OrvexError('OrvexPay: apiKey is required to initialize the client.');
        }

        this.client = axios.create({
            baseURL: options.baseURL ? options.baseURL.replace(/\/$/, '') : 'https://api.orvexpay.com',
            headers: {
                'x-api-key': options.apiKey,
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });

        this.invoices = new InvoicesResource(this.client);
    }
}
