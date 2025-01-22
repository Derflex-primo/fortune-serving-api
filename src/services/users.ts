import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Pagination, UserRegistration } from "../types";
import { register_user_with_addreses } from "../db/postgres/queries";
import { Address, User } from "../@codegen";

export default class ServiceUser {
    private secret_key: string

    constructor() {
        this.secret_key = process.env.JWT_SECRET_KEY || ''
    }

    /**
     * Generate a JSON Web Token (JWT) for authentication.
     * @param payload - An object containing user information to encode in the token (e.g., user ID, email, role).
     * @returns A signed JWT string with the payload and a 1-hour expiration.
     */
    private generate_jwt(payload: object): string {
        return jwt.sign(payload, this.secret_key, { expiresIn: "1h" });
    }

    /**
     * Hash password securely using Argon2
     * @param password
     * @returns The hashed password
     */
    private async hash_password(password: string): Promise<string> {
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

    /**
     * Registers a user in the users table along with their addresses.
     * @param user - The user registration object containing user details.
     * @returns The registered user object, excluding password and password_hash, and including addresses, or undefined if an error occurs.
     */
    public async register(user: UserRegistration): Promise<(Omit<User, "password" | "password_hash"> & { addresses: Address[] }) | undefined> {
        try {
            const password_hash = await this.hash_password(user.password)
            const registered_user = await register_user_with_addreses({ ...user, password_hash })

            return registered_user;
        } catch (error) {
            console.error("Error registering user", error);
            return undefined;
        }
    }

    /**
     * Returns all the users in paginated way.
     * @param get - The pagination query for cursor or keyset keyset pagination.
     * @returns A set of rows 
     */
    public async get_all_users(pagination: Partial<Pagination>) {
        return []
    }
}