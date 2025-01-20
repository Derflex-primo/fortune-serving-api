import { UserRegistration } from "../../../types";
import pool from "../config";

export default async function insert_user(user: UserRegistration & { password_hash: string }): Promise<void> {
    const client = pool.connect();
    const current_timestamp = new Date().toISOString();

    try {

        const query = `
          INSERT INTO users (
            full_name,
            phone_number,
            email,
            password_hash,
            date_of_birth,
            role,
            is_verified,
            status,
            session_token,
            terms_accepted_at,
            privacy_policy_accepted_at,
            created_at,
            updated_at
          ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
          )
          RETURNING  (
            id, 
            full_name, 
            phone_number, 
            email, 
            date_of_birth, 
            role, 
            is_verified, 
            status, 
            session_token
         );
    `

    } catch (error) {

    }

}