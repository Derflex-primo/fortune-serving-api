import { Address, User } from "../@codegen";
import { Pagination, UserRegistration } from "../types";
import { ServiceProtection } from "./index";
import { get_all_users_with_pagination, register_user_with_addreses } from "../db/postgres/queries";

export default class ServiceUser {
    private readonly cap_limit: number = 40;
    private readonly protection: ServiceProtection;

    constructor() {
        this.protection = new ServiceProtection;
    }

    /**
     * Registers a user in the users table along with their addresses.
     * @param user - The user registration object containing user details.
     * @returns The registered user object, excluding password and password_hash, and including addresses, or undefined if an error occurs.
     */
    public async register(user: UserRegistration): Promise<(Omit<User, "password" | "password_hash"> & { addresses: Address[] }) | null> {
        try {
            const password_hash = await this.protection.hash_password(user.password)
            const result = await register_user_with_addreses({ ...user, password_hash })

            return result;
        } catch (error) {
            console.error("Error registering user", error);
            return null;
        }
    }

    /**
     * Returns all the users in paginated way.
     * @param pagination - The pagination query for cursor or keyset pagination.
     * @returns A subset of user rows based on the n of limit specified. 
     */
    public async get_all_users(pagination: Partial<Pagination>): Promise<{ users: Omit<User, "password" | "password_hash">[], pagination: Pagination } | null> {
        try {
            const limit = pagination.limit || this.cap_limit;
            const order = pagination.order ? pagination.order.toUpperCase() : "ASC";
            const next_page = pagination.next_page ? this.protection.decrypt(pagination.next_page) : "0";

            const result = await get_all_users_with_pagination({ limit, order, next_page });

            let cursor_next_page: string | null = null;

            if (result.length > limit) {
                cursor_next_page = result[limit].id.toString() || null;
                result.splice(limit);
            };

            const encypted_cursor_next_page = this.protection.encrypt(parseInt(cursor_next_page as string));

            return {
                users: result,
                pagination: {
                    limit: limit,
                    order: order,
                    next_page: encypted_cursor_next_page
                }
            };
        } catch (error) {
            console.error("Error in returning all users", error)
            return null;
        }
    }
}