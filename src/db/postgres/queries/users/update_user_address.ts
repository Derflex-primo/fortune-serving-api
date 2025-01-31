import pool from "../../config";
import { Address } from "../../../../@codegen";

export default async function update_user_address(id: string, address_id: string, address: Address): Promise<Address> {
    const client = await pool.connect()

    try {
        const query = `
              UPDATE addresses
              SET
                address_type = $1,
                street_address = $2,
                city = $3,
                postal_code = $4,
                country = $5
              WHERE user_id = $6 AND id = $7
              RETURNING
                id,
                user_id,
                address_type,
                street_address,
                city,
                postal_code,
                country;
        `;

        const values = [
            address.address_type,
            address.street_address,
            address.city,
            address.postal_code,
            address.country,
            id,
            address_id
        ];

        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {

        console.error("Transaction failed: update_user_address", error);
        throw error;

    } finally {
        client.release();
    }
}