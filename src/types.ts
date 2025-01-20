import { User } from "./@codegen";

export type UserRegistration = Pick<User, 'full_name' | 'email' | 'phone_number' | 'password_hash' | 'date_of_birth' | 'role'>;