import pool from "../config";

export default async function delete_user(id: string): Promise<boolean> {
    const client = await pool.connect();

    try {

        const query = `DELETE FROM users WHERE id = $1`;

        const result = await client.query(query, [id]);

        return (result.rowCount as number > 0);
    } catch (error) {

        console.error("Transaction failed: delete_user", error);
        throw error;

    } finally {
        client.release();
    }
}