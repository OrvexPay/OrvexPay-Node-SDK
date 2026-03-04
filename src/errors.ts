export class OrvexError extends Error {
    public readonly statusCode?: number;
    public readonly responseData?: any;

    constructor(message: string, statusCode?: number, responseData?: any) {
        super(message);
        this.name = 'OrvexError';
        this.statusCode = statusCode;
        this.responseData = responseData;

        // Ensure stack trace is correctly captured in Node.js
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, OrvexError);
        }
    }
}

export class OrvexSignatureError extends OrvexError {
    constructor(message: string) {
        super(message, 401);
        this.name = 'OrvexSignatureError';
    }
}
