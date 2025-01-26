import { Address, User } from "../@codegen";

export default function normalize_response_format_user(
    data: (Omit<User, "password" | "password_hash"> & Address & { address_id: string })[] | null
): Omit<User, "password" | "password_hash"> & { addresses: Address & { address_id: string }[] } | null {

    if (!data || data.length === 0) {
        return null;
    }

    const user = {
        id: data[0].id,
        full_name: data[0].full_name,
        phone_number: data[0].phone_number,
        email: data[0].email,
        date_of_birth: data[0].date_of_birth,
        role: data[0].role,
        is_verified: data[0].is_verified,
        status: data[0].status,
        subscription_type: data[0].subscription_type,
        profile_image: data[0].profile_image,
        addresses: data
            .map(row => ({
                id: row.address_id,
                address_type: row.address_type,
                street_address: row.street_address,
                city: row.city,
                postal_code: row.postal_code,
                country: row.country,
            })),
    };
    //@ts-ignore
    return user;
}