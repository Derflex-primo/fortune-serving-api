import { UserRegistration } from "../types";

export default class ServiceUser {
    private secret_key: string

    constructor() {
        this.secret_key = process.env.JWT_SECRET_KEY || ''
    }

    /**
     * Hash password securely using Argon2
     * @param password
     * @returns The hashed password
     */
     private async function hash_password(password: string) {
        
     }


    // public async register(user: UserRegistration): Promise<any> {
    //     return {
    //         message: "User created successfully!",
    //         data: user,
    //     };
    // }
}