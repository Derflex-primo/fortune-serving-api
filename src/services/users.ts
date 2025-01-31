import { Address, User } from "../@codegen";
import { Pagination, UserRegistration } from "../types";
import { ServiceProtection } from "./index";
import { normalize_response_format_user } from "../utils";
import {
    query_get_users,
    query_get_user,
    query_get_user_addresses,
    query_get_user_address,
    query_post_user,
    query_post_user_address,
    query_update_user,
    query_update_user_address,
    query_delete_user,
    query_delete_user_address
} from "../db/postgres/queries";

export default class ServiceUser {
    private readonly cap_limit: number = 40;
    private readonly protection: ServiceProtection;

    constructor() {
        this.protection = new ServiceProtection;
    }

    /**
     * Creates a user in the users table along with their addresses.
     * @param user - The user object containing user details.
     * @returns The addded user object, excluding password and password_hash, and including addresses, or undefined if an error occurs.
     */
    public async post_user(user: UserRegistration): Promise<(Omit<User, "password" | "password_hash"> & { addresses: Address[] }) | null> {
        try {
            const password_hash = await this.protection.hash_password(user.password)
            const result = await query_post_user({ ...user, password_hash })

            return result;
        } catch (error) {
            console.error("Error creating user", error);
            return null;
        }
    }

    /**
     * Creates a address in addresses table.
     * @param id - uuid format to be used as foreign key to add address.
     * @param address - The address object, containing required fields.
     * @returns The added address object.
     */
    public async post_user_address(id: string, address: Address): Promise<Address | null> {
        try {
            const result = await query_post_user_address(id, address);

            return result;
        } catch (error) {
            console.error("Error creating address", error);
            return null;
        }
    }

    /**
     * Returns all the users in paginated way.
     * @param pagination - The pagination query for cursor or keyset pagination.
     * @returns A subset of user rows based on the n of limit specified. 
     */
    public async get_users(pagination: Partial<Pagination>): Promise<{ users: Omit<User, "password" | "password_hash">[], pagination: Pagination } | null> {
        try {
            const limit = pagination.limit || this.cap_limit;
            const order = pagination.order ? pagination.order.toUpperCase() : "ASC";
            const next_page = pagination.next_page ? this.protection.decrypt(pagination.next_page) : null;

            const result = await query_get_users({ limit, order, next_page });

            let cursor_next_page: string | null = null;

            if (result.length > limit) {
                cursor_next_page = result[limit].id || null;
                result.splice(limit);
            };

            const encypted_cursor_next_page = this.protection.encrypt(cursor_next_page as string);

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

    /**
     * Returns user details.
     * @param id - uuid format to be used to fetch user.
     * @returns User details.
     */
    public async get_user(id: string): Promise<Omit<User, "password" | "password_hash"> & { addresses: (Address & { address_id: string })[] } | null> {
        try {
            const result = await query_get_user(id);
            const user = normalize_response_format_user(result)

            //@ts-ignore
            return user;
        } catch (error) {
            console.error("Error in returning user", error)
            return null;
        }
    }

    /**
     * Returns user addresses.
     * @param id - uuid format to be used to fetch user addresses.
     * @returns User addresses.
     */
    public async get_user_addresses(id: string): Promise<Address[] | null> {
        try {
            const result = await query_get_user_addresses(id);

            return result;
        } catch (error) {
            console.error("Error in returning user", error)
            return null;
        }
    }

    /**
     * Returns user address.
     * @param id -  uuid format to be used to fetch user address.
     * @param address_id - uuid format to be used to identify which address to fetch.
     * @returns  User address.
     */
    public async get_user_address(id: string, address_id: string): Promise<Address | null> {
        try {
            const result = await query_get_user_address(id, address_id);

            return result;
        } catch (error) {
            console.error("Error in returning user", error)
            return null;
        }
    }

    /**
     * Updates user details.
     * @param id - uuid format to be used to update user
     * @param user - The user details object to be udpate.
     * @returns The updated user details.
     */
    public async update_user(id: string, user: Partial<Omit<User, "password" | "password_hash">>): Promise<Omit<User, "password" | "password_hash"> | null> {
        try {
            const result = await query_update_user(id, user);

            return result;
        } catch (error) {
            console.error("Error in returning user", error)
            return null;
        }
    }

    /**
     * Updates users address.
     * @param id - uuid format to be used to update user.
     * @param address_id - uuid format to be used to identify which address to update.
     * @param address - The user address object to be udpate.
     * @returns The updated user address.
     */
    public async update_user_address(id: string, address_id: string, address: Address): Promise<Address | null> {
        try {
            const result = await query_update_user_address(id, address_id, address);

            return result;
        } catch (error) {
            console.error("Error in updating user address", error)
            return null;
        }
    }

    /**
     * Deletes user entirely.
     * @param id - uuid format to be used to delete user.
     * @returns A boolean value.
     */
    public async delete_user(id: string): Promise<boolean | null> {
        try {
            const result = await query_delete_user(id);

            return result;
        } catch (error) {
            console.error("Error in deleting user", error)
            return null;
        }
    }

    /**
     * Deletes user address entirely.
     * @param id - uuid format to be used to delete user address.
     * @param address_id - uuid format to be used to identify which address to delete.
     * @returns A boolean value.
     */
    public async delete_user_address(id: string, address_id: string): Promise<boolean | null> {
        try {
            const result = await query_delete_user_address(id, address_id);

            return result;
        } catch (error) {
            console.error("Error in deleting user address", error)
            return null;
        }
    }
}