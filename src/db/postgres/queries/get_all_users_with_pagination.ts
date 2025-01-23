import { User } from "../../../@codegen";
import { Pagination } from "../../../types";

export default async function get_all_users_with_pagination(pagination: Pagination): Promise<(Omit<User, "password" | "password_hash">[] & Pagination)> {
    return []
}