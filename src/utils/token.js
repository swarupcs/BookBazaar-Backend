import crypto from 'crypto';


export const generateVerificationToken = () => {
    const unHashedToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex');
    const expiry = Date.now() + 20 * 60 * 1000;

    return { unHashedToken, hashedToken, expiry };
}