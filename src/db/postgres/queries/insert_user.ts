// import { User } from "../../../@codegen";
// import { UserRegistration } from "../../../types";
// import pool from "../config";

// export default async function insert_user(user: UserRegistration & { password_hash: string }): Promise<User> {
//     const client = pool.connect();
//     try {

//     const query = `
//       INSERT INTO users (
//       full_name,
//       phone_number,
//       email,
//       password_hash,
//       date_of_birth,
//       profile_image,
//       role,
//       is_verified,
//       status,
//       last_login,
//       last_logout,
//       session_token,
//       subscription_type,
//       terms_accepted_at,
//       privacy_policy_accepted_at,
//       created_at,
//       updated_at
//     ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
// RETURNING id, full_name, phone_number, email, date_of_birth, role, is_verified, status, created_at, updated_at;

     
//     `
        
//     } catch (error) {
        
//     }

// }