import jwt from "jsonwebtoken";
import argon2 from "argon2";
import crypto from "node:crypto";

export default class ServiceProtection {
    private readonly signature_key: Buffer;
    private readonly jwt_secret_key: string;

    constructor() {
        this.jwt_secret_key = process.env.JWT_SECRET_KEY || "";
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

    /**
     * Generate a JSON Web Token (JWT) for authentication.
     * @param payload - An object containing user information to encode in the token (e.g., user ID, email, role).
     * @returns A signed JWT string with the payload and a 1-hour expiration.
     */
    public generate_jwt(payload: object): string {
        return jwt.sign(payload, this.jwt_secret_key, { expiresIn: "1h" });
    }

    /**
     * Hash password securely using Argon2
     * @param password
     * @returns The hashed password
     */
    public async hash_password(password: string): Promise<string> {
        try {
            const hash = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                timeCost: 3,
                parallelism: 1
            })
            return hash
        } catch (error) {
            console.error("Error hashing password:", error);
            throw new Error("Could not hash the password.");
        }
    }

    /**
    * Verify a password against its hash.
    * @param password - The plaintext password to verify.
    * @param hash - The stored password hash.
    * @returns True if the password matches, false otherwise.
    */
    public async verify_password(password: string, hash: string): Promise<boolean> {
        try {
            return await argon2.verify(hash, password);
        } catch (error) {
            console.error("Error verifying password:", error);
            return false;
        }
    }
}