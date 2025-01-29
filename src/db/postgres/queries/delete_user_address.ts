import pool from "../config";


export default async function delete_user_address(id: string, address_id: string): Promise<boolean> {
    const client = await pool.connect();

    try {

        const query = `DELETE FROM addresses WHERE user_id = $1 AND id = $2`;

        const values = [id, address_id];

        const result = await client.query(query, values);

        return (result.rowCount as number > 0);
    } catch (error) {

        console.error("Transaction failed: delete_user_address", error);
        throw error;

    } finally {
        client.release();
    }
}