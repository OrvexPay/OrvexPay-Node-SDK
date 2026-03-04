import { AxiosInstance } from 'axios';
import { CreateInvoiceRequest, InvoiceResponse } from '../types';
import { OrvexError } from '../errors';

export class InvoicesResource {
    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    private handleError(error: any): never {
        if (error.response && error.response.data) {
            throw new OrvexError(
                error.response.data.message || 'OrvexPay API Error',
                error.response.status,
                error.response.data
            );
        }
        throw error;
    }

    /**
     * Creates a new payment invoice.
     * @param params 
     * @returns 
     */
    async create(params: CreateInvoiceRequest): Promise<InvoiceResponse> {
        try {
            const response = await this.client.post<InvoiceResponse>('/api/invoice', params);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Retrieves an invoice by its invoiceId.
     * @param invoiceId The invoice ID returned by the initial API call
     * @returns 
     */
    async retrieve(invoiceId: string): Promise<InvoiceResponse> {
        try {
            const response = await this.client.get<InvoiceResponse>(`/api/invoice/${invoiceId}`);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }
}
