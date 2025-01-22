import { Address, User } from "./@codegen";

export type UserRegistration = Pick<User, 'full_name' | 'email' | 'phone_number' | 'password' | 'date_of_birth' | 'role' | 'terms_accepted_at' | 'privacy_policy_accepted_at'> & {
    addresses: Omit<Address, 'id' | 'user_id' | 'store_id' | 'created_at' | 'updated_at'>[];
};

export type Pagination = {
    limit?: string,
    next_page?: string,
    prev_page?: string
}