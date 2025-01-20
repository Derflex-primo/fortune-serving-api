import { UserRegistration } from "../types";

export default class ServiceUser {

    public async register(user: UserRegistration): Promise<any> {
        return {
            message: "User created successfully!",
            data: user,
        };
    }
}