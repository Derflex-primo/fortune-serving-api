import crypto from "node:crypto";

export default class ServiceProtection {
    private readonly signature_key: Buffer;

    constructor() {
        this.signature_key = crypto
            .createHash("sha256")
            .update(process.env.SIGNATURE_KEY || "")
            .digest();
    }

    /**
     * Encrypt a value using AES-GCM.
     * @param value - The value to encrypt.
     * @returns The encrypted value as a Base64 string.
     */
    public encrypt(value: string | number): string {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv("aes-256-gcm", this.signature_key, iv);

        const value_as_string = typeof value === "number" ? value.toString() : value;
        const encrypted = Buffer.concat([
            cipher.update(value_as_string, "utf8"),
            cipher.final(),
        ]);
        const auth_tag = cipher.getAuthTag();

        const combined = Buffer.concat([iv, encrypted, auth_tag]);

        return combined
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    /**
     * Decrypt a value using AES-GCM.
     * @param encrypted_value - The encrypted data as a Base64 string.
     * @returns The decrypted value as a string.
     */
    public decrypt(encrypted_value: string): string {
        const normalized_base64 = encrypted_value.replace(/-/g, "+").replace(/_/g, "/");

        const combined = Buffer.from(normalized_base64, "base64");
        const iv = combined.subarray(0, 12);
        const auth_tag = combined.subarray(combined.length - 16);
        const encrypted = combined.subarray(12, combined.length - 16);

        const decipher = crypto.createDecipheriv("aes-256-gcm", this.signature_key, iv);
        decipher.setAuthTag(auth_tag);

        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString("utf8");
    }
}