import pool from "../config";
import { Address, User } from "../../../@codegen";
import { UserRegistration } from "../../../types";

export default async function register_user(user: UserRegistration & { password_hash: string }): Promise<User & { addresses: Address[] }> {
  const client = await pool.connect();
  const current_timestamp = new Date().toISOString();

  try {

    client.query('BEGIN');

    const user_query = `
          INSERT INTO users (
            full_name,
            phone_number,
            email,
            password_hash,
            date_of_birth,
            role,
            is_verified,
            status,
            terms_accepted_at,
            privacy_policy_accepted_at,
            created_at,
            updated_at
          ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
          ) 
          ON CONFLICT (phone_number, email) DO NOTHING
          RETURNING 
             id, 
             full_name,
             phone_number,
             email,
             date_of_birth,
             role,
             is_verified,
             status; 
     `;

    const user_values = [
      user.full_name,
      user.phone_number,
      user.email,
      user.password_hash,
      user.date_of_birth,
      user.role,
      false,
      'active',
      user.terms_accepted_at,
      user.privacy_policy_accepted_at,
      current_timestamp,
      current_timestamp
    ];

    const user_data = await client.query(user_query, user_values);
    const user_id = user_data.rows[0].id;

    const address_query = `
          INSERT INTO addresses (
            user_id,
            address_type,
            street_address,
            city,
            postal_code,
            country,
            created_at,
            updated_at
           ) VALUES (
             $1, $2, $3, $4, $5, $6, $7, $8
           ) RETURNING
              id,
              user_id,
              address_type,
              street_address,
              city,
              postal_code,
              country;
     `;

    // should be in a bulk process
    const addresses = [];

    for (const address of user.addresses) {
      const address_values = [
        user_id,
        address.address_type,
        address.street_address,
        address.city,
        address.postal_code,
        address.country,
        current_timestamp,
        current_timestamp
      ];

      const addresses_data = await client.query(address_query, address_values)
      addresses.push(addresses_data.rows[0]);
    };

    client.query('COMMIT');

    return { ...user_data.rows[0], addresses }
  } catch (error) {

    await client.query("ROLLBACK");
    console.error("Transaction failed: register_user", error);
    throw error;

  } finally {
    client.release();
  }

}