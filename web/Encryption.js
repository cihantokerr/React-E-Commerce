import crypto from 'crypto';

const ENCRYPTION_KEY = crypto.randomBytes(32); // 32-byte key for AES-256
const IV_LENGTH = 16; // IV must be exactly 16 bytes

// Encrypt function
export function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`; // Store IV with encrypted text
}


export function decrypt(encryptedText) {
    const [ivHex, encrypted] = encryptedText.split(':');
    if (!ivHex || !encrypted) {
        throw new Error("Invalid encrypted text format");
    }
    const iv = Buffer.from(ivHex, 'hex'); // Convert IV back to Buffer
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
