import { Address, User } from "./@codegen";

export type UserRegistration = Pick<User, 'full_name' | 'email' | 'phone_number' | 'password' | 'date_of_birth' | 'role'> & {
    addresses: Omit<Address, 'id' | 'user_id' | 'store_id' | 'created_at' | 'updated_at'>[];
};