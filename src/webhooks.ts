import * as crypto from 'crypto';
import { OrvexSignatureError } from './errors';

export class Webhooks {
    /**
     * Verifies the signature of an incoming webhook from OrvexPay.
     * 
     * @param payload Raw string body of the webhook request.
     * @param signature The signature from the 'x-orvex-signature' header.
     * @param secret Your webhook secret from the Merchant Dashboard.
     * @returns boolean
     */
    static verifySignature(payload: string, signature: string, secret: string): boolean {
        if (!signature || !secret) {
            throw new OrvexSignatureError('Missing signature or webhook secret.');
        }

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');

        const signatureBuffer = Buffer.from(signature);
        const expectedBuffer = Buffer.from(expectedSignature);

        if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
            throw new OrvexSignatureError('Invalid webhook signature.');
        }

        return true;
    }
}
