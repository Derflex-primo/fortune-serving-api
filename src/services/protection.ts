import crypto from "crypto";

export default class ServiceProtection {
    private readonly signature_key: Uint8Array;

    constructor() {
        this.signature_key = crypto.createHash("sha256").update(process.env.SIGNATURE_KEY || "").digest();
    }

    /**
    * Encrypt a value using AES-GCM.
    * @param value - The value to encrypt (e.g., user_id).
    * @returns The encrypted value as a Base64 string.
    */
    public async encrypt(value: number): Promise<string> {
        try {

            const key = await crypto.subtle.importKey(
                "raw",
                this.signature_key,
                { name: "AES-GCM" },
                false,
                ["encrypt"]
            );

            const data = new TextEncoder().encode(value.toString());
            const iv = crypto.getRandomValues(new Uint8Array(12));

            const encrypted_data = await crypto.subtle.encrypt(
                { name: "AES-GCM", iv },
                key,
                data
            );

            const encrypted_bytes = new Uint8Array(encrypted_data);
            const combined_bytes = new Uint8Array(iv.length + encrypted_bytes.length);
            combined_bytes.set(iv);
            combined_bytes.set(encrypted_bytes, iv.length);

            return btoa(String.fromCharCode(...combined_bytes));
        } catch (error) {
            console.error("Encryption failed:", error);
            throw new Error("Failed to encrypt value.");
        }
    }

    /**
    * Decrypt a value
    * @param encrypted_data - The encrypted data as a base64 string.
    * @returns The decrypted value as a string.
    */
    public async decrypt(encryptedData: string): Promise<string> {
        try {
            const key = await crypto.subtle.importKey(
                "raw",
                this.signature_key,
                { name: "AES-GCM" },
                false,
                ["decrypt"]
            );

            const combined = new Uint8Array(
                atob(encryptedData).split("").map((char) => char.charCodeAt(0))
            );

            const iv = combined.slice(0, 12);
            const encrypted_bytes = combined.slice(12);

            const decrypted_data = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv },
                key,
                encrypted_bytes
            );

            return new TextDecoder().decode(decrypted_data);
        } catch (error) {
            console.error("Decryption error:", error);
            throw new Error("Failed to decrypt user_id.");
        }
    }

}