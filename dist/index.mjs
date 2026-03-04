// src/client.ts
import axios from "axios";

// src/resources/invoices.ts
var InvoicesResource = class {
  client;
  constructor(client) {
    this.client = client;
  }
  /**
   * Creates a new payment invoice.
   * @param params 
   * @returns 
   */
  async create(params) {
    try {
      const response = await this.client.post("/api/invoice", params);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(`OrvexPay API Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
  /**
   * Retrieves an invoice by its invoiceId.
   * @param id The invoice ID returned by the initial API call
   * @returns 
   */
  async retrieve(invoiceId) {
    try {
      const response = await this.client.get(`/api/invoice/${invoiceId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(`OrvexPay API Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
};

// src/client.ts
var OrvexClient = class {
  invoices;
  client;
  constructor(options) {
    if (!options.apiKey) {
      throw new Error("OrvexPay: apiKey is required to initialize the client.");
    }
    this.client = axios.create({
      baseURL: options.baseURL ? options.baseURL.replace(/\/$/, "") : "https://api.orvexpay.com",
      headers: {
        "x-api-key": options.apiKey,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    });
    this.invoices = new InvoicesResource(this.client);
  }
};
export {
  InvoicesResource,
  OrvexClient
};
