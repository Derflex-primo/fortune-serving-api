import pool from "../../config";
import { Address } from "../../../../@codegen";

export default async function get_user_address(id: string, address_id: string): Promise<Address> {
    const client = await pool.connect();

    try {
        const query = `
            SELECT
               id,
               user_id,
               address_type,
               street_address,
               city,
               postal_code,
               country
            FROM addresses
            WHERE user_id = $1 AND id = $2;
       `;

        const values = [id, address_id];

        const result = await client.query(query, values);

        return result.rows[0]
    } catch (error) {

        console.error("Transaction failed: get_user_address", error);
        throw error;

    } finally {
        client.release();
    }
}