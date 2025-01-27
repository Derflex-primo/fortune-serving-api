import pool from "../config";

export default async function delete_user(id: string): Promise<boolean> {
    const client = await pool.connect();

    try {

        return true;
    } catch (error) {

        console.error("Transaction failed: get_user", error);
        throw error;

    } finally {
        client.release();
    }
}